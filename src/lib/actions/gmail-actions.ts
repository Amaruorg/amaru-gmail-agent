"use server";

import { auth } from "@/lib/auth";
import { google } from "googleapis";

export async function getGoogleAccessToken(accountId: string, userId: string) {
	const { accessToken } = await auth.api.getAccessToken({
		body: {
			providerId: "google",
			accountId,
			userId,
		},
	});
	return accessToken ?? null;
}

export async function fetchInbox(accountId: string, userId: string) {
	if (!accountId || !userId) throw new Error("Invalid accountId or userId");

	const accessToken = await getGoogleAccessToken(accountId, userId);
	if (!accessToken) throw new Error("No Google access token");

	try {
		const oauth2Client = new google.auth.OAuth2();
		oauth2Client.setCredentials({ access_token: accessToken });
		const gmail = google.gmail({ version: "v1", auth: oauth2Client });
		const res = await gmail.users.messages.list({ userId: "me" });
		return res.data.messages || [];
	} catch (error) {
		console.error("Error fetching inbox:", error);
		throw new Error("Failed to fetch inbox");
	}
}
