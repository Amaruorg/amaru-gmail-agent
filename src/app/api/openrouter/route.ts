import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import {
	ActionCollection,
	Action,
	SummarizeAction,
	ScheduleAction,
	isSummarizeAction,
	isScheduleAction,
	ActionsResponse,
} from "@/domains/gmail/types";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const prompt = body.prompt;

		// console.log("BODY: ", JSON.stringify(body));

		const openrouter = createOpenRouter({
			apiKey: config.OPENROUTER_API_KEY,
			baseURL: "https://openrouter.ai/api/v1",
		});

		const model = "openai/gpt-oss-20b:free";

		const res = await generateText({
			messages: [{ role: "user", content: prompt }],
			model: openrouter(model, {
				extraBody: {
					zdr: true,
					temperature: 0,
					response_format: {
						type: "json_schema",
						json_schema: {
							name: "actions",
							strict: true,
							schema: {
								type: "object",
								description:
									"Structured output for analyzing a batch of emails and generating actions such as summaries or calendar events.",
								behavior: {
									purpose:
										"To summarize every email and, when applicable, create calendar events for those containing time-based information.",
									rules: [
										"Every email must have exactly one 'summarize' action.",
										"If an email includes event-related information, add one additional 'schedule_google_calendar' action.",
										"Never omit the summary, even when an event is detected.",
										"Return a single JSON object with all actions in an array under the 'actions' key.",
									],
									output_style: "Concise JSON array, no text outside JSON.",
									confidence: "High",
								},
								properties: {
									actions: {
										type: "array",
										description: "Array of actions to take for each email (summarize or schedule an event).",
										allowed_action_types: ["summarize", "schedule_google_calendar"],
										behavior: {
											expectation:
												"At least one summarize action per email; schedule actions are optional but recommended if event data is present.",
										},
										items: {
											type: "object",
											description: "An action describing what to do with a specific email.",
											properties: {
												type: {
													type: "string",
													description: "The type of action. Must be either 'summarize' or 'schedule_google_calendar'.",
													enum: ["summarize", "schedule_google_calendar"],
												},
												emailId: {
													type: "string",
													description: "The unique identifier (UUID or similar) of the email being processed.",
												},
												emailSummary: {
													type: "string",
													description:
														"If type = 'summarize', this field contains the plain-text summary of the email content.",
												},
												category: {
													type: "string",
													description:
														"If type = 'summarize', Gmail label/category for organizing the email (e.g., 'Education', 'Work', 'Personal', 'Finance', 'Travel', 'Shopping', 'Important', 'Newsletters').",
												},
												event: {
													type: "object",
													description:
														"If type = 'schedule_google_calendar', this field contains details for creating a calendar event.",
													properties: {
														eventTitle: {
															type: "string",
															description: "Title of the calendar event.",
														},
														location: {
															type: "string",
															description: "Event location or meeting link.",
														},
														description: {
															type: "string",
															description: "Detailed event description or context.",
														},
														start: {
															type: "string",
															format: "date-time",
															description: "Event start in ISO 8601 format with timezone offset",
														},
														end: {
															type: "string",
															format: "date-time",
															description: "Event end in ISO 8601 format with timezone offset",
														},
													},
													required: ["eventTitle", "location", "description", "start", "end"],
												},
											},
											required: ["type", "emailId"],
											allOf: [
												{
													if: {
														properties: { type: { const: "summarize" } },
													},
													then: {
														required: ["emailSummary", "category"],
													},
												},
												{
													if: {
														properties: { type: { const: "schedule_google_calendar" } },
													},
													then: {
														required: ["event"],
													},
												},
											],
											behavior: {
												summarize_condition: "Always present.",
												schedule_condition: "Present only if the email includes date/time/event data.",
											},
										},
									},
								},
								required: ["actions"],
								examples: [
									{
										actions: [
											{
												type: "summarize",
												emailId: "199afaa4f6896d2e",
												category: "Events",
												emailSummary:
													"Invitation to FutureWork Expo 2025, an international HR technology event taking place on September 21.",
											},
											{
												type: "schedule_google_calendar",
												emailId: "199afaa4f6896d2e",
												event: {
													eventTitle: "FutureWork Expo 2025",
													location: "Virtual Event",
													description: "A global conference on HR technology and workplace innovation.",
													start: "2025-09-21T09:00:00-04:00",
													end: "2025-09-21T17:00:00-04:00",
												},
											},
										],
									},
									{
										actions: [
											{
												type: "summarize",
												emailId: "8b3c2a1d9e4f5g6h",
												category: "Finance",
												emailSummary:
													"Monthly credit card statement showing balance of $1,234.56 due by October 15, 2025.",
											},
										],
									},
									{
										actions: [
											{
												type: "summarize",
												emailId: "7f2e8d3c4b5a6g1h",
												category: "Work",
												emailSummary:
													"Team meeting scheduled for October 10 at 2 PM to discuss Q4 project deliverables.",
											},
											{
												type: "schedule_google_calendar",
												emailId: "7f2e8d3c4b5a6g1h",
												event: {
													eventTitle: "Q4 Project Deliverables Meeting",
													location: "Conference Room B / Zoom link: https://zoom.us/j/123456789",
													description:
														"Quarterly team meeting to review and discuss Q4 project deliverables and timelines.",
													start: "2025-10-10T14:00:00-07:00",
													end: "2025-10-10T15:00:00-07:00",
												},
											},
										],
									},
									{
										actions: [
											{
												type: "summarize",
												emailId: "3a4b5c6d7e8f9g0h",
												category: "Shopping",
												emailSummary: "Order confirmation for laptop purchase, estimated delivery on October 8, 2025.",
											},
										],
									},
								],
							},
						},
					},
				},
			}),
		});

		//console.log("\n\nRESPONSE: ", JSON.stringify(res));
		//console.log("\n\nTEXT: ", res.text);

		const parsedResult: ActionsResponse = JSON.parse(res.text);

		const actionsResult = parsedResult?.actions;

		if (!Array.isArray(actionsResult)) {
			console.error("Model returned unexpected 'actions' shape:", actionsResult);
			return NextResponse.json({ error: "Model returned unexpected format" }, { status: 502 });
		}

		const actions: ActionCollection = [];

		const makeSummary = (action: Action): SummarizeAction | null => {
			if (!isSummarizeAction(action)) return null;
			if (!action.emailId || !action.emailSummary || !action.category) {
				console.warn("Incomplete summarize action, skipping:", JSON.stringify(action));
				return null;
			}

			return {
				id: randomUUID(),
				type: "summarize",
				timestamp: Date.now(),
				status: "completed",
				model: model,
				emailId: action.emailId,
				emailSummary: action.emailSummary,
				category: action.category,
			};
		};

		const makeSchedule = (action: Action): ScheduleAction | null => {
			if (!isScheduleAction(action)) return null;
			if (!action.emailId || !action.event) {
				console.warn("Incomplete schedule action, skipping:", JSON.stringify(action));
				return null;
			}

			return {
				id: randomUUID(),
				type: "schedule_google_calendar",
				timestamp: Date.now(),
				status: "completed",
				model: model,
				emailId: action.emailId,
				event: action.event,
			};
		};

		for (const action of actionsResult) {
			try {
				const summary = makeSummary(action);
				if (summary) {
					//console.log("Summary Action detected: ", JSON.stringify(action));
					actions.push(summary);
					continue;
				}

				const schedule = makeSchedule(action);
				if (schedule) {
					//console.log("Schedule Action detected: ", JSON.stringify(action));
					actions.push(schedule);
					continue;
				}

				console.warn("Skipping unknown or invalid action:", JSON.stringify(action));
			} catch (err) {
				console.error("Error processing action, skipping:", err, action);
			}
		}

		return NextResponse.json(actions);
	} catch (error) {
		console.error("OpenRouter API Error Details:", error);
		return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
	}
}
