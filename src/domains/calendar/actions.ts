"use server";

import { headers } from "next/headers";
import { authService } from "../auth/service";
import { calendarClient, type CalendarEventInput } from "./client";

export async function createCalendarEvent(
	eventInput: CalendarEventInput,
): Promise<{ success: boolean; message: string; link?: string }> {
	try {
		const tokenData = await authService.getAccessToken(await headers());

		const link = await calendarClient.createEvent(tokenData, eventInput);

		return {
			success: true,
			message: "Event created successfully",
			link,
		};
	} catch (error) {
		console.error("Error creating calendar event:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to create event",
		};
	}
}
