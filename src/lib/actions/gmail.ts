"use server";

import { auth } from "@/lib/authClient";
import { google } from "googleapis";
import { headers } from "next/headers";

export async function getGoogleAccessToken() {
	const res = await auth.api.getSession({ headers: await headers() });
	if (!res?.session || !res.user) throw new Error("Not authenticated");

	const { session, user } = res;

	const { accessToken } = await auth.api.getAccessToken({
		body: { providerId: "google", userId: user.id },
	});

	console.log(accessToken);
	return accessToken ?? null;
}

export async function fetchInbox(accessToken: string) {
	if (!accessToken) throw new Error("No access token provided to fetchInbox");

	const oAuth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.REDIRECT_URL,
	);

	oAuth2Client.setCredentials({ access_token: accessToken });

	const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
	const res = await gmail.users.messages.list({
		userId: "me",
		maxResults: 5,
	});

	// Get message data
	const messages = res.data.messages || [];
	const detailedMessages = [];

	for (const message of messages) {
		try {
			const messageDetail = await gmail.users.messages.get({
				userId: "me",
				id: message.id!,
			});

			const payload = messageDetail.data.payload;
			const headers = payload?.headers || [];

			const subject = headers.find((h) => h.name === "Subject")?.value || "No Subject";
			const from = headers.find((h) => h.name === "From")?.value || "Unknown Sender";
			const snippet = messageDetail.data.snippet || "";

			detailedMessages.push({
				id: message.id,
				subject,
				from,
				snippet,
			});
		} catch (error) {
			console.error(`Error fetching message ${message.id}:`, error);
		}
	}

	return detailedMessages;
}

export async function getSummary(userPrompt?: string) {
	const accessToken = await getGoogleAccessToken();
	if (!accessToken) throw new Error("No access token available");
	const messages = await fetchInbox(accessToken);

	// Format the emails as strings
	const emailsString = messages
		.map(
			(msg, index) =>
				`Email ${index + 1}:\n` + `From: ${msg.from}\n` + `Subject: ${msg.subject}\n` + `Content: ${msg.snippet}\n`,
		)
		.join("\n---\n");

	const basePrompt = "Summarize concisely unless important the next emails";
	const customPrompt = userPrompt ? `\nUser prompt: ${userPrompt}` : "";
	const fullPrompt = `${basePrompt}${customPrompt}\n\nEmails:\n${emailsString}\n\nPlease provide a clear and concise summary of these emails unless the User Prompt says otherwise.`;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/gemini`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: fullPrompt }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.text || "No summary available";
	} catch (error) {
		console.error("Error calling Gemini API:", error);
		return "Error generating summary";
	}
}
