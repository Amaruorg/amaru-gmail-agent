import { gmailClient } from "@/domains/gmail/client";
import { GmailMappers } from "@/domains/gmail/mappers";
import type { EmailListParams, EmailListResponse, TokenData } from "@/domains/gmail/types";
import type { Email } from "@/shared/types/common";

export class GmailService {
	async fetchInbox(tokenData: TokenData, params: EmailListParams = {}): Promise<EmailListResponse> {
		const { maxResults = 5 } = params;

		if (!tokenData?.accessToken) {
			throw new Error("No access token provided to fetchInbox");
		}

		try {
			// Get list of message IDs
			const messagesList = await gmailClient.listEmails(tokenData, maxResults);
			const messages = messagesList.messages || [];

			// Get detailed message data
			const detailedMessages: Email[] = [];

			for (const message of messages) {
				try {
					const messageDetail = await gmailClient.getEmail(tokenData, message.id!);
					const email = GmailMappers.toEmail(messageDetail);
					detailedMessages.push(email);
				} catch (error) {
					throw new Error(
						`Failed to fetch message details: ${error instanceof Error ? error.message : "Unknown error"}`,
					);
				}
			}

			return {
				emails: detailedMessages,
				nextPageToken: messagesList.nextPageToken || undefined,
				totalCount: detailedMessages.length,
			};
		} catch (error) {
			throw error;
		}
	}

	async fetchInboxEmails(tokenData: TokenData, params: EmailListParams = {}): Promise<Email[]> {
		const inbox = await this.fetchInbox(tokenData, params);
		return inbox.emails;
	}
}

// Singleton instance
export const gmailService = new GmailService();
