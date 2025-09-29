"use server";

import { gmailService } from "@/domains/gmail/service";
import { headers } from "next/headers";
import { authService } from "../auth/service";
import type { ActionCollection, Email } from "@/domains/gmail/schema";

export async function getEmailsSummary(userPrompt?: string): Promise<ActionCollection> {
	try {
		const tokenData = await authService.getAccessToken("google", await headers());
		const messages = await gmailService.fetchInboxEmails(tokenData, { maxResults: 5 });
		
		if (!messages || messages.length === 0) {
			throw new Error("No emails found to summarize");
		}

		const emailsForAPI: Email[] = messages.map(msg => ({
			id: msg.id,
			subject: msg.subject,
			from: msg.from,
			threadId: undefined, // Fix later
		}));

		const basePrompt =
			"Summarize concisely unless important the next emails. Please provide a clear and concise summary of these emails unless the User Prompt says otherwise.";
		const prompt = `${basePrompt} ${userPrompt ? `\n\nUser prompt: ${userPrompt}` : ""}`;

		const response = await fetch(`http://localhost:3000/api/openrouter`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 
				prompt, 
				emails: emailsForAPI,
				userPrompt 
			}),
		});

		if (!response.ok) {
			throw new Error(`API call failed: ${response.status}`);
		}

		const actionCollection: ActionCollection = await response.json();
		return actionCollection;
	} catch (error) {
		console.error("Error getting summary:", error);
		throw error;
	}
}
