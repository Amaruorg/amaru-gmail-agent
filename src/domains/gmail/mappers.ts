import type { gmail_v1 } from "googleapis";
import type { EmailHeader } from "@/domains/gmail/types";
import type { Email } from "@/shared/types/common";

export class GmailMappers {
	static toEmail(message: gmail_v1.Schema$Message): Email {
		const payload = message.payload;
		const headers: EmailHeader[] = (payload?.headers || []).map((h) => ({
			name: h.name ?? "",
			value: h.value ?? "",
		}));

		const subject = this.extractHeader(headers, "Subject") || "No Subject";
		const from = this.extractHeader(headers, "From") || "Unknown Sender";
		const date = this.extractHeader(headers, "Date");
		const snippet = message.snippet || "";

		return {
			id: message.id!,
			subject,
			from,
			snippet,
			date,
			labels: message.labelIds || [],
			isRead: !message.labelIds?.includes("UNREAD"),
		};
	}

	static extractHeader(headers: EmailHeader[], name: string): string | undefined {
		return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value;
	}

	static formatEmailsForAI(emails: Email[]): string {
		return emails
			.map((msg) => `From: ${msg.from}\n` + `Subject: ${msg.subject}\n` + `Content: ${msg.snippet}\n`)
			.join("\n---\n");
	}
}
