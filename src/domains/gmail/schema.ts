import { z } from "zod";

export interface ActionBase {
	id: string;
	name: string;
	type: ActionType;
	timestamp: string;
	status: ActionStatus;
}

export type ActionType = "summary" // | "categorize" | "prioritize" | "draft" | "translate" | "schedule" | "todo";

export type ActionStatus = "pending" | "processing" | "completed" | "failed";

export interface Email {
	id: string; // Gmail message ID
	threadId?: string; // Gmail thread ID
	subject?: string;
	from?: string;
}

export interface SummaryAction extends ActionBase {
	type: "summary";
	emails: Email[];
	userPrompt?: string;
	summary: string;
	metadata: {
		emailCount: number;
		processingTime?: number; // milliseconds
		model: string; // AI model used
	};
}

// Currently only summary is implemented
export type Action = SummaryAction;

export interface ActionCollection {
	actions: Action[];
	metadata: {
		total: number;
		byType: Record<ActionType, number>;
		lastUpdated: string;
	};
}

// Zod Schemas

export const EmailSchema = z.object({
	id: z.string().min(1, "Email ID is required"),
	threadId: z.string().optional(),
	subject: z.string().optional(),
	from: z.email("Invalid sender email format").optional(),
});

const ActionBaseSchema = z.object({
	id: z.string().min(1, "Action ID is required"),
	name: z.string().min(1, "Action name is required"),
	timestamp: z.iso.datetime("Invalid ISO datetime format"),
	status: z.enum(["pending", "processing", "completed", "failed"]),
});

export const SummaryActionSchema = ActionBaseSchema.extend({
	type: z.literal("summary"),
	emails: z.array(EmailSchema).min(1, "At least one email is required"),
	userPrompt: z.string().optional(),
	summary: z.string().min(1, "Summary cannot be empty"),
	metadata: z.object({
		emailCount: z.number().int().min(1),
		processingTime: z.number().int().min(0).optional(),
		model: z.string().optional(),
	}),
});

// TODO: Add more schemas for the rest of the actions 
export const ActionSchema = z.discriminatedUnion("type", [
	SummaryActionSchema,
]);

export const ActionCollectionSchema = z.object({
	actions: z.array(ActionSchema),
	metadata: z.object({
		total: z.number().int().min(0),
		byType: z.record(z.string(), z.number().int().min(0)),
		lastUpdated: z.iso.datetime(),
	}),
});

export function createActionBase(type: ActionType, name: string): Omit<ActionBase, "status"> & { status: "pending" } {
	return {
		id: crypto.randomUUID(),
		name,
		type,
		timestamp: new Date().toISOString(),
		status: "pending" as const,
	};
}

export function createEmail(id: string, additional?: Partial<Omit<Email, 'id'>>): Email {
	return {
		id,
		...additional,
	};
}

/* export interface CategorizeAction extends ActionBase {
	type: "categorize";
	emails: Email[];
	categories: Array<{
		category: string;
		emails: Email[];
		confidence: number; // 0-1 confidence score
	}>;
	metadata: {
		totalCategories: number;
		uncategorizedCount: number;
	};
}

export interface PrioritizeAction extends ActionBase {
	type: "prioritize";
	emails: Email[];
	prioritizedEmails: Array<{
		email: Email;
		priority: "high" | "medium" | "low";
		score: number; // 0-100 priority score
		reasons: string[];
	}>;
	metadata: {
		highPriority: number;
		mediumPriority: number;
		lowPriority: number;
	};
}

export interface DraftAction extends ActionBase {
	type: "draft";
	replyTo: Email;
	draft: {
		to: string[];
		cc?: string[];
		bcc?: string[];
		subject: string;
		body: string;
		isHtml: boolean;
	};
	metadata: {
		tone: "formal" | "casual" | "friendly" | "professional";
		language: string;
	};
}

export interface ScheduleAction extends ActionBase {
	type: "schedule";
	emails: Email[];
	scheduledItems: Array<{
		title: string;
		description?: string;
		startTime: string; // ISO string
		endTime?: string; // ISO string
		location?: string;
		attendees: string[];
		sourceEmail: Email;
	}>;
	metadata: {
		totalItems: number;
		timeZone: string;
	};
} */