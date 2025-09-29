import type { ActionCollection } from "@/domains/gmail/schema";

export interface AIProvider {
	summarize(prompt?: string): Promise<ActionCollection>;
}