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

	console.log(accessToken)
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
	console.log(res.data.messages);
	return res.data.messages || [];
}

export async function getSummary() {
	const accessToken = await getGoogleAccessToken();
	if (!accessToken) throw new Error("No access token available");
	const messages = await fetchInbox(accessToken);
	return messages;
}
