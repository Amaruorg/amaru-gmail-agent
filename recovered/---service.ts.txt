import { openRouterClient } from "@/domains/ai/client";
import type { AIProvider } from "@/domains/ai/types";
import type { ActionCollection } from "@/domains/gmail/schema";

export class AIService {
	private aiProvider: AIProvider;

	constructor(aiProvider: AIProvider) {
		this.aiProvider = aiProvider;
	}

	async getSummary(context: string, prompt?: string): Promise<ActionCollection> {
		const fullPrompt = `${prompt}\n\n${context}\n`;

		try {
			if (!context) {
				throw new Error("No context to summarize");
			}

			const actionCollection = await this.aiProvider.summarize(fullPrompt);

			return actionCollection;
		} catch (error) {
			throw error;
		}
	}

	// Method to change AI provider at runtime if needed
	setAIProvider(provider: AIProvider): void {
		this.aiProvider = provider;
	}
}

export const aiService = new AIService(openRouterClient);
