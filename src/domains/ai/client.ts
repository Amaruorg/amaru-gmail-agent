import { apiConfig } from "@/lib/config";
import type { AIProvider } from "@/domains/ai/types";

export class GeminiClient implements AIProvider {
	async summarize(prompt?: string): Promise<string> {
		try {
			const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.gemini}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: prompt }),
				credentials: "include",
				mode: "cors",
			});

			if (!response.ok) {
				let errorMessage = `Failed to generate summary (${response.status})`;

				try {
					const errorData = await response.json();
					if (errorData.error) {
						errorMessage += `: ${errorData.error}`;
					}
				} catch {
					// If response.json() fails, keep the basic error message
				}

				throw new Error(errorMessage);
			}

			const data = await response.json();
			const summary = data.text || "No summary available";

			return summary;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(`Unexpected error during summary generation: ${String(error)}`);
		}
	}
}

// Singleton instance
export const geminiClient = new GeminiClient();
