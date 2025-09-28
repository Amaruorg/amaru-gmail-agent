import type { AddressObject } from "mailparser";

export interface TokenData {
	accessToken: string;
	refreshToken?: string;
}

// We need to change this in the future for new features
export interface Email {
	id: string;
	content: string;
	snippet?: string;
	subject?: string;
	date?: Date;
	from?: AddressObject;
	priority?: "normal" | "low" | "high";
	labels?: string[];
	isRead: boolean;
}

export interface EmailInboxResponse {
	emails: Email[];
	nextPageToken?: string;
	totalCount?: number;
}

// ACTIONS

export type ActionType = "summarize" | "schedule_google_calendar";
export type ActionStatus = "pending" | "processing" | "completed" | "failed";

export interface CalendarEvent {
	eventTitle: string;
	location: string;
	description: string;
	start: string; // ISO 8601 with timezone
	end: string; // ISO 8601 with timezone
}

export interface ActionBase {
	id: string;
	type: ActionType;
	timestamp: number;
	status: ActionStatus;
	processingTime?: number;
	model: string;
}

export interface SummarizeAction extends ActionBase {
	type: "summarize";
	emailId: string;
	emailSummary: string;
	category: string;
}

export interface ScheduleAction extends ActionBase {
	type: "schedule_google_calendar";
	emailId: string;
	event: CalendarEvent;
}

export type Action = SummarizeAction | ScheduleAction; // add other actions later

export interface ActionsResponse {
	actions: Action[];
}

export type ActionCollection = Action[];

export function isSummarizeAction(action: Action): action is SummarizeAction {
	return action.type === "summarize";
}

export function isScheduleAction(action: Action): action is ScheduleAction {
	return action.type === "schedule_google_calendar";
}
