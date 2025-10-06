import { apiConfig } from "@/lib/config";
import type { AIProvider } from "@/domains/ai/types";
import type { ActionCollection } from "@/domains/gmail/types";

// NOT USED

/* 
export class OpenRouterClient implements AIProvider {
	async summarize(prompt?: string): Promise<ActionCollection> {
		try {
			const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.openrouter}`, {
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

			const actionCollection: ActionCollection = await response.json();

			return actionCollection;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error(`Unexpected error during summary generation: ${String(error)}`);
		}
	}
}

export const openRouterClient = new OpenRouterClient();
 */