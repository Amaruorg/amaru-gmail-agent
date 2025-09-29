import { geminiClient } from "@/domains/ai/client";
import type { AIProvider } from "@/domains/ai/types";

export class AIService {
	private aiProvider: AIProvider;

	constructor(aiProvider: AIProvider) {
		this.aiProvider = aiProvider;
	}

	async getSummary(context: string, prompt?: string): Promise<string> {
		const fullPrompt = `${prompt}\n\n${context}\n`;

		try {
			if (!context) {
				return "No context to summarize";
			}

			// Generate summary using AI provider
			const summary = await this.aiProvider.summarize(fullPrompt);

			return summary;
		} catch (error) {
			throw error;
		}
	}

	// Method to change AI provider at runtime if needed
	setAIProvider(provider: AIProvider): void {
		this.aiProvider = provider;
	}
}

// Singleton instance
export const aiService = new AIService(geminiClient);
