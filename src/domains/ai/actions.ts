"use server";

import { gmailService } from "@/domains/gmail/service";
import { GmailMappers } from "@/domains/gmail/mappers";
import { headers } from "next/headers";
import { authService } from "../auth/service";
import { apiConfig } from "@/lib/config";
import { getCachedEmailTitle } from "@/shared/emailCache";
import type { Action, ActionCollection } from "@/domains/gmail/types";
import { buildGmailQuery, type GmailQueryOptions } from "@/lib/utils/gmailQuery";

export async function getEmailAnalysis(userPrompt?: string): Promise<ActionCollection> {
	try {
		const tokenData = await authService.getAccessToken(await headers());
		const emails = (await gmailService.fetchInbox(tokenData)).emails;

		if (emails.length === 0) {
			throw new Error("No emails found to summarize");
		}

		const basePrompt = `
		You are an assistant that analyzes a batch of emails and outputs structured JSON actions.
		
		For every email:
		1. Always include exactly one action of type "summarize" that provides a clear, concise summary of the email's content and assigns an appropriate Gmail label/category.
		2. If the email contains any date, time, or event-related information, also include one additional action of type "schedule_google_calendar" with accurate event details (eventTitle, location, description, start, end).
		
		Guidelines for summaries:
		- Write in natural, plain text in the "emailSummary" field.
		- Capture all key facts, context, and intent of the email.
		- Be concise but do not omit critical details.
		- Prioritize completeness and accuracy over brevity when necessary.
		
		Guidelines for categorization:
		- Assign a Gmail label/category in the "category" field for every email.
		- Use clear, common categories like: Work, Personal, Finance, Events, Travel, Shopping, Important, Newsletters, Social, Health, Education, etc.
		- Choose the most relevant category based on the email's primary purpose and content.
		
		Guidelines for event detection:
		- Create a "schedule_google_calendar" action only if the email contains clear event data (date, time, topic, participants, or location).
		- In the event object, use "eventTitle" (not "summary") for the calendar event's title.
		- Infer missing details cautiously, based on strong contextual clues only.
		- Use ISO 8601 format for dateTime fields and valid IANA time zone names.
		- Include meaningful descriptions and locations (including virtual meeting links if mentioned).
		
		Output format:
		- Always return a single JSON object that strictly conforms to the provided schema.
		- The "actions" array may contain multiple items per email (e.g., one "summarize" and one "schedule_google_calendar").
		- Each "summarize" action must include: type, emailId, emailSummary, and category.
		- Each "schedule_google_calendar" action must include: type, emailId, and event (with eventTitle, location, description, start, end).
		- Do not include any text outside the JSON.
		
		If the user prompt includes extra instructions, adapt your behavior accordingly while maintaining valid JSON output.
		`
		
		const formattedEmails = GmailMappers.formatEmailsForAI(emails);
		const prompt = `${basePrompt}${userPrompt ? `\n\nUser prompt: ${userPrompt}` : ""}\n\nEmails: ${formattedEmails}`;

		let response: Response;
		try {
			response = await fetch(`${apiConfig.baseUrl}/api/openrouter`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			throw new Error(`Network error while calling AI API: ${msg}`);
		}

		if (!response.ok) {
			const bodyText = await response.text().catch(() => "<unable to read response body>");
			const shortBody = bodyText.length > 200 ? `${bodyText.slice(0, 200)}...` : bodyText;
			throw new Error(`API call failed: ${response.status} ${response.statusText} - ${shortBody}`);
		}

		let data: any = await response.json();

		const actions: ActionCollection = data;

		for (const action of actions) {
			try {
				if (action.type === "summarize" && (action as any).emailId) {
					const id = (action as any).emailId;
					// Get truncated title (max 60 chars by default)
					const title = getCachedEmailTitle(id, 60);
					//console.log("getEmailAnalysis: enriching action with title", { emailId: id, title });
					if (title) {
						(action as any).emailTitle = title;
					}
				}
			} catch (e) {
				//console.debug("getEmailAnalysis: failed to enrich action with title", e);
			}
		}

		return actions;
	} catch (error) {
		console.error("Error getting summary:", error);
		throw error;
	}
}

export async function getCollectionAnalysis(
	queryOptions: GmailQueryOptions,
	userPrompt?: string
): Promise<ActionCollection> {
	try {
		const tokenData = await authService.getAccessToken(await headers());
		
		// Build the Gmail query from filter options
		const gmailQuery = buildGmailQuery(queryOptions);
		//console.log("getCollectionAnalysis: built query", { queryOptions, gmailQuery });

		// Fetch emails with the custom query
		const emails = (await gmailService.fetchInbox(tokenData, 10, gmailQuery, true)).emails;

		if (emails.length === 0) {
			throw new Error("No emails found matching the collection filters");
		}

		//console.log(`getCollectionAnalysis: found ${emails.length} emails matching filters`);

		const basePrompt = `
		You are an assistant that analyzes a batch of emails and outputs structured JSON actions.
		
		For every email:
		1. Always include exactly one action of type "summarize" that provides a clear, concise summary of the email's content and assigns an appropriate Gmail label/category.
		2. If the email contains any date, time, or event-related information, also include one additional action of type "schedule_google_calendar" with accurate event details (eventTitle, location, description, start, end).
		
		Guidelines for summaries:
		- Write in natural, plain text in the "emailSummary" field.
		- Capture all key facts, context, and intent of the email.
		- Be concise but do not omit critical details.
		- Prioritize completeness and accuracy over brevity when necessary.
		
		Guidelines for categorization:
		- Assign a Gmail label/category in the "category" field for every email.
		- Use clear, common categories like: Work, Personal, Finance, Events, Travel, Shopping, Important, Newsletters, Social, Health, Education, etc.
		- Choose the most relevant category based on the email's primary purpose and content.
		
		Guidelines for event detection:
		- Create a "schedule_google_calendar" action only if the email contains clear event data (date, time, topic, participants, or location).
		- In the event object, use "eventTitle" (not "summary") for the calendar event's title.
		- Infer missing details cautiously, based on strong contextual clues only.
		- Use ISO 8601 format for dateTime fields and valid IANA time zone names.
		- Include meaningful descriptions and locations (including virtual meeting links if mentioned).
		
		Output format:
		- Always return a single JSON object that strictly conforms to the provided schema.
		- The "actions" array may contain multiple items per email (e.g., one "summarize" and one "schedule_google_calendar").
		- Each "summarize" action must include: type, emailId, emailSummary, and category.
		- Each "schedule_google_calendar" action must include: type, emailId, and event (with eventTitle, location, description, start, end).
		- Do not include any text outside the JSON.
		
		If the user prompt includes extra instructions, adapt your behavior accordingly while maintaining valid JSON output.
		`;

		const formattedEmails = GmailMappers.formatEmailsForAI(emails);
		const prompt = `${basePrompt}${userPrompt ? `\n\nUser prompt: ${userPrompt}` : ""}\n\nEmails: ${formattedEmails}`;

		let response: Response;
		try {
			response = await fetch(`${apiConfig.baseUrl}/api/openrouter`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			throw new Error(`Network error while calling AI API: ${msg}`);
		}

		if (!response.ok) {
			const bodyText = await response.text().catch(() => "<unable to read response body>");
			const shortBody = bodyText.length > 200 ? `${bodyText.slice(0, 200)}...` : bodyText;
			throw new Error(`API call failed: ${response.status} ${response.statusText} - ${shortBody}`);
		}

		let data: any = await response.json();

		const actions: ActionCollection = data;

		// Enrich actions with email titles from cache
		for (const action of actions) {
			try {
				if (action.type === "summarize" && (action as any).emailId) {
					const id = (action as any).emailId;
					const title = getCachedEmailTitle(id, 60);
					//console.log("getCollectionAnalysis: enriching action with title", { emailId: id, title });
					if (title) {
						(action as any).emailTitle = title;
					}
				}
			} catch (e) {
				//console.debug("getCollectionAnalysis: failed to enrich action with title", e);
			}
		}

		return actions;
	} catch (error) {
		console.error("Error getting collection analysis:", error);
		throw error;
	}
}

export async function getUnreadEmailCount(): Promise<number> {
	try {
		const tokenData = await authService.getAccessToken(await headers());
		// Fetch latest 10 emails without clearing cache (optimize for frequent polling)
		const result = await gmailService.fetchInbox(tokenData, 10, "in:inbox", false);
		
		// Count unread emails
		const unreadCount = result.emails.filter(email => !email.isRead).length;
		//console.log(`getUnreadEmailCount: ${unreadCount} unread out of ${result.emails.length} emails`);
		
		return unreadCount;
	} catch (error) {
		console.error("Error getting unread count:", error);
		return 0;
	}
}
