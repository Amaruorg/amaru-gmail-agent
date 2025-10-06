import { gmailClient } from "@/domains/gmail/client";
import { GmailMappers } from "@/domains/gmail/mappers";
import type { Email, EmailInboxResponse, TokenData } from "@/domains/gmail/types";
import { getCachedEmail, setCachedEmail, clearEmailCache } from "@/shared/emailCache";

export class GmailService {
	async fetchInbox(tokenData: TokenData, maxResults: number = 10, customQuery?: string, clearCache: boolean = true): Promise<EmailInboxResponse> {
		if (!tokenData?.accessToken) {
			throw new Error("No access token provided to fetchInbox");
		}

		// Clear cache at the start of each fetch to ensure consistency
		// and prevent stale data from affecting results across runs
		// Can be disabled for subsequent queries in the same context
		if (clearCache) {
			clearEmailCache();
		}

		try {
			const messagesList = await gmailClient.listMessages(tokenData, maxResults, undefined, customQuery);
			const messages = messagesList.messages || [];

			const detailedMessages: Email[] = [];

			for (const message of messages) {
				if (!message.id) {
					console.warn("No ID found. Message skipped.");
					continue;
				}

				const cached = getCachedEmail(message.id);
				if (cached) {
					//console.debug("fetchInbox: cache hit", { id: message.id, subject: cached.subject, snippet: cached.snippet });
					detailedMessages.push(cached);
					continue;
				}

				try {
					const messageDetail = await gmailClient.getEmail(tokenData, message.id);
					const email = await GmailMappers.toEmail(messageDetail);
					//console.debug("fetchInbox: caching email", { id: email.id, subject: email.subject, snippet: email.snippet });
					setCachedEmail(email.id, email);
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
