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
	const accessToken = await getGoogleAccessToken(accountId, userId);
	if (!accessToken) throw new Error("No Google access token");

	const gmail = google.gmail({ version: "v1", auth: accessToken });
	const res = await gmail.users.messages.list({ userId: "me" });

	return res || [];
}
