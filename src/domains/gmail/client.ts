import { google } from "googleapis";
import { authConfig } from "@/lib/config";
import type { TokenData } from "@/domains/gmail/types";

export class GmailClient {
	private createOAuth2Client(tokenData: TokenData) {
		const oAuth2Client = new google.auth.OAuth2(
			authConfig.google.clientId,
			authConfig.google.clientSecret,
			"postmessage",
		);

		const credentials = {
			access_token: tokenData.accessToken,
			token_type: "Bearer",
		};

		oAuth2Client.setCredentials(credentials);

		return oAuth2Client;
	}

	async listEmails(tokenData: TokenData, maxResults: number = 10) {
		try {
			const oAuth2Client = this.createOAuth2Client(tokenData);
			const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

			const response = await gmail.users.messages.list({
				userId: "me",
				maxResults,
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
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

// Singleton instance
export const gmailClient = new GmailClient();
