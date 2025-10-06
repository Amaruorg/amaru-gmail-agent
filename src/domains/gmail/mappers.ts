import type { gmail_v1 } from "googleapis";
import type { Email } from "@/domains/gmail/types";
import { simpleParser } from "mailparser";

export class GmailMappers {
	static async toEmail(message: gmail_v1.Schema$Message): Promise<Email> {
		if (!message.raw || !message.id) {
			throw new Error("Message raw content is missing");
		}

		const messageBuffer = Buffer.from(message.raw, "base64url");

		const mail = await simpleParser(messageBuffer, {
			skipTextToHtml: true,
			skipTextLinks: true,
		});

		for (const [key, value] of Object.entries(mail)) {
			if (!value) {
				console.warn(`${key} isn't defined`);
			}
		}

		if (mail.html === false) {
			throw new Error("Message html content is missing");
		}

		return {
			id: message.id,
			content: mail.text || mail.html,
			snippet: message.snippet ?? undefined,
			subject: mail.subject ?? undefined,
			date: mail.date ?? undefined,
			from: mail.from ?? undefined,
			priority: mail.priority ?? undefined,
			labels: message.labelIds ?? undefined,
			isRead: !message.labelIds?.includes("UNREAD"),
		};
	}

	static formatEmailsForAI(emails: Email[]): string {
		return emails.map((email) => `Email ID:${email.id}\nContent: ${email.content}\n`).join("\n---\n");
	}
}
