import { gmailClient } from "@/domains/gmail/client";
import { GmailMappers } from "@/domains/gmail/mappers";
import type { Email, EmailInboxResponse, TokenData } from "@/domains/gmail/types";

export class GmailService {
	async fetchInbox(tokenData: TokenData, maxResults: number = 10): Promise<EmailInboxResponse> {
		if (!tokenData?.accessToken) {
			throw new Error("No access token provided to fetchInbox");
		}

		try {
			const messagesList = await gmailClient.listMessages(tokenData, maxResults);
			const messages = messagesList.messages || [];

			const detailedMessages: Email[] = [];

			for (const message of messages) {
				if (!message.id) {
					console.warn("No ID found. Message skipped.");
					continue;
				}

				try {
					const messageDetail = await gmailClient.getEmail(tokenData, message.id);
					const email = await GmailMappers.toEmail(messageDetail);
					detailedMessages.push(email);
				} catch (error) {
					console.error(`Failed to fetch message details: ${error instanceof Error ? error.message : "Unknown error"}`);
					continue;
				}
			}

			return {
				emails: detailedMessages,
				nextPageToken: messagesList.nextPageToken ?? undefined,
				totalCount: detailedMessages.length,
			};
		} catch (error) {
			throw error;
		}
	}
}

export const gmailService = new GmailService();
