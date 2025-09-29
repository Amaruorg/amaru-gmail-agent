import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { createActionBase, type Email, type ActionCollection, type SummaryAction } from "@/domains/gmail/schema";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const promptText = body.prompt;
		const emails = (body.emails as Email[]) || [];

		if (!promptText) {
			return NextResponse.json({ error: "A message is required" }, { status: 400 });
		}

		if (emails.length === 0) {
			return NextResponse.json({ error: "At least one email is required" }, { status: 400 });
		}
		
		const openrouter = createOpenRouter({
			apiKey: config.OPENROUTER_API_KEY,
			baseURL: "https://openrouter.ai/api/v1",
		});

		const summaryActions: SummaryAction[] = [];
		
		for (let i = 0; i < emails.length; i++) {
			const email = emails[i];
			const startTime = Date.now();
			
			const emailPrompt = `${promptText}\n\nEmail to summarize:\nID: ${email.id}\nSubject: ${email.subject || 'N/A'}\nFrom: ${email.from || 'N/A'}\nThread ID: ${email.threadId || 'N/A'}`;

			const response = streamText({
				model: openrouter("qwen/qwen3-235b-a22b:free"),
				prompt: emailPrompt
			});

			const text = await response.text;
			const processingTime = Date.now() - startTime;

			const actionBase = createActionBase("summary", `Summary for Email ${i + 1}`);
			const summaryAction: SummaryAction = {
				...actionBase,
				type: "summary" as const,
				emails: [email], // Individual email
				userPrompt: body.userPrompt,
				summary: text,
				status: "completed" as const,
				metadata: {
					emailCount: 1,
					processingTime,
					model: "x-ai/grok-4-fast:free",
				},
			};

			summaryActions.push(summaryAction);
		}

		const actionCollection: ActionCollection = {
			actions: summaryActions,
			metadata: {
				total: summaryActions.length,
				byType: {
					summary: summaryActions.length,
				},
				lastUpdated: new Date().toISOString(),
			},
		};

		console.log(JSON.stringify(actionCollection, null, 2));

		return NextResponse.json(actionCollection);
	} catch (error) {
		console.error("OpenRouter API Error Details:", error);
		return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
	}
}
