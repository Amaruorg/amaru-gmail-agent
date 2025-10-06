/**
 * Builds a Gmail search query string based on filter criteria.
 * See: https://support.google.com/mail/answer/7190?hl=en
 */

export type GmailFilterType = "domain" | "email";

export interface GmailQueryOptions {
	filterType: GmailFilterType;
	filterValues: string[]; // Support multiple values
	interval?: string; // Number of days (e.g., "5", "7", "10") or empty for all
}

export function buildGmailQuery(options: GmailQueryOptions): string {
	const { filterType, filterValues, interval } = options;

	if (!filterValues || filterValues.length === 0) {
		throw new Error("At least one filter value is required");
	}

	const queryParts: string[] = [];

	// Add filter based on type
	if (filterType === "domain") {
		// For domains, use "from:*@domain.com" for each domain
		const domainQueries = filterValues.map((domain) => {
			// Remove leading @ if present
			const cleanDomain = domain.startsWith("@") ? domain.slice(1) : domain;
			return `from:*@${cleanDomain}`;
		});
		// Combine multiple domains with OR
		if (domainQueries.length > 1) {
			queryParts.push(`(${domainQueries.join(" OR ")})`);
		} else {
			queryParts.push(domainQueries[0]);
		}
	} else if (filterType === "email") {
		// For emails, use "from:email@example.com" for each email
		const emailQueries = filterValues.map((email) => `from:${email}`);
		// Combine multiple emails with OR
		if (emailQueries.length > 1) {
			queryParts.push(`(${emailQueries.join(" OR ")})`);
		} else {
			queryParts.push(emailQueries[0]);
		}
	}

	// Add time interval if specified
	if (interval && interval !== "" && !isNaN(Number(interval))) {
		const days = Number(interval);
		queryParts.push(`newer_than:${days}d`);
	}

	// Always filter to inbox
	queryParts.push("in:inbox");

	return queryParts.join(" ");
}
