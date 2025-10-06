import { google } from "googleapis";
import { authShared } from "@/lib/config";
import type { TokenData } from "@/domains/gmail/types";

export interface CalendarEventInput {
	eventTitle: string;
	location: string;
	description: string;
	start: string; // ISO 8601 with timezone
	end: string; // ISO 8601 with timezone
}

export class CalendarClient {
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

	async createEvent(tokenData: TokenData, eventInput: CalendarEventInput): Promise<string> {
		try {
			const oAuth2Client = this.createOAuth2Client(tokenData);
			const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

			const event = {
				summary: eventInput.eventTitle,
				location: eventInput.location,
				description: eventInput.description,
				start: {
					dateTime: eventInput.start,
				},
				end: {
					dateTime: eventInput.end,
				},
				reminders: {
					useDefault: true,
				},
			};

			const response = await calendar.events.insert({
				calendarId: "primary",
				requestBody: event,
			});

			//console.log("Calendar event created:", response.data.id, response.data.htmlLink);
			return response.data.htmlLink || response.data.id || "Event created successfully";
		} catch (error) {
			console.error("Error creating calendar event:", error);
			throw error;
		}
	}
}

export const calendarClient = new CalendarClient();
