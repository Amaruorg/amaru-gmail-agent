import { google } from "googleapis";
import { authShared } from "@/lib/config";
import type { TokenData } from "@/domains/gmail/types";

export class GmailClient {
	private createOAuth2Client(tokenData: TokenData) {
		const oAuth2Client = new google.auth.OAuth2({
			clientId: authShared.clientId,
			clientSecret: authShared.clientSecret,
			redirectUri: authShared.redirectUrl,
		});

		oAuth2Client.setCredentials({
			access_token: tokenData.accessToken,
			refresh_token: tokenData.refreshToken,
		});

		return oAuth2Client;
	}

	async listMessages(tokenData: TokenData, maxResults: number = 10, pageToken?: string, customQuery?: string) {
		try {
			const oAuth2Client = this.createOAuth2Client(tokenData);
			const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

			// Use custom query if provided, otherwise default to inbox
			const query = customQuery || "in:inbox";

			const response = await gmail.users.messages.list({
				userId: "me",
				pageToken: pageToken,
				maxResults: maxResults,
				q: query,
				// Gmail API orders by internalDate desc by default, but we explicitly rely on it
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getEmail(tokenData: TokenData, messageId: string) {
		try {
			const oAuth2Client = this.createOAuth2Client(tokenData);
			const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

			const response = await gmail.users.messages.get({
				userId: "me",
				id: messageId,
				format: "raw",
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export const gmailClient = new GmailClient();
