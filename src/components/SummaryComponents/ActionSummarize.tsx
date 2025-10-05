"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getEmailsSummary } from "@/domains/ai/actions";
import { Button } from "@/components/ui";

type ActionSummarizeProps = {
	summary: string;
	className?: string;
};

function ActionSummarize({ summary: initialSummary, className }: ActionSummarizeProps) {
	const [userPrompt, setUserPrompt] = useState("");
	const [summary, setSummary] = useState(initialSummary);
	const [isLoading, setIsLoading] = useState(false);

	const handleRun = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const newSummary = await getEmailsSummary(userPrompt || undefined);
			setSummary(newSummary);
		} catch (error) {
			console.error("Error getting summary:", error);
			setSummary("Error generating summary");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`${className}`}>
			<div className="mt-5 flex h-12 w-1/2 overflow-hidden rounded-lg border border-neutral-800">
				<Button text={isLoading ? "Loading..." : "Today summary"} size="sm" onClick={handleRun} disabled={isLoading} />
			</div>
			<div className="mt-5 h-1/2 w-1/2 rounded-lg bg-neutral-900 p-5">
				<div className="prose prose-invert h-full max-w-none overflow-auto text-sm leading-relaxed">
					<ReactMarkdown>{summary}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}

export { ActionSummarize };
