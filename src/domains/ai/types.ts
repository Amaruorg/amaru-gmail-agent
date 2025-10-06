import type { ActionCollection } from "@/domains/gmail/types";

export interface AIProvider {
	summarize(prompt?: string): Promise<ActionCollection>;
}
