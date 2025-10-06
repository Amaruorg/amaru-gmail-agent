import type { Email } from "@/domains/gmail/types";

const cache = new Map<string, Email>();
let processedCount = 0;

export const setCachedEmail = (id: string, email: Email | undefined) => {
	if (!id || !email) return;
	const already = cache.has(id);
	cache.set(id, email);
	if (!already) processedCount++;
};

export const getCachedEmail = (id: string): Email | undefined => {
	return cache.get(id);
};

export const getCachedEmailTitle = (id: string, maxLength: number = 60): string | undefined => {
	const email = cache.get(id);
	if (!email) return undefined;
	let title: string | undefined;
	if (email.subject && email.subject.trim().length > 0) {
		title = email.subject;
	} else if (email.snippet && email.snippet.trim().length > 0) {
		title = email.snippet;
	}

	if (title && title.length > maxLength) {
		return title.substring(0, maxLength) + "...";
	}
	return title;
};

export const getProcessedEmailCount = (): number => processedCount;

export const clearEmailCache = () => {
	cache.clear();
	processedCount = 0;
};

export default cache;
