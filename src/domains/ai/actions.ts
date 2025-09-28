"use server";

import { gmailService } from "@/domains/gmail/service";
import { GmailMappers } from "@/domains/gmail/mappers";
import { aiService } from "@/domains/ai/service";
import { headers } from "next/headers";
import { authService } from "../auth/service";

export async function getEmailsSummary(userPrompt?: string): Promise<string> {
	try {
		const headersList = await headers();
		const tokenData = await authService.getAccessToken("google", headersList);
		const messages = await gmailService.fetchInboxEmails(tokenData, { maxResults: 5 });
		const emailsString = "Emails:\n" + GmailMappers.formatEmailsForAI(messages);

		if (!emailsString) {
			return "No emails found to summarize";
		}

		const basePrompt =
			"Summarize concisely unless important the next emails. Please provide a clear and concise summary of these emails unless the User Prompt says otherwise.";
		const prompt = `${basePrompt} ${userPrompt ? `\n\nUser prompt: ${userPrompt}` : ""}`;

		return await aiService.getSummary(emailsString, prompt);
	} catch (error) {
		console.error("Error getting summary:", error);
		throw error;
	}
}
