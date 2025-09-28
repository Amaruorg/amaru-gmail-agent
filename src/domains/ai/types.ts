export interface AIProvider {
	summarize(prompt?: string): Promise<string>;
}
