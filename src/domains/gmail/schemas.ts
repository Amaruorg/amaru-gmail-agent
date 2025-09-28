import { z } from "zod";

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
export const ActionSchema = z.discriminatedUnion("type", [SummaryActionSchema]);

export const ActionCollectionSchema = z.object({
	actions: z.array(ActionSchema),
	metadata: z.object({
		total: z.number().int().min(0),
		byType: z.record(z.string(), z.number().int().min(0)),
		lastUpdated: z.iso.datetime(),
	}),
});
