"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getSummary } from "@/lib/actions/gmail";

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
			const newSummary = await getSummary(userPrompt || undefined);
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
			<div>
				<span className="text-2xl">
					Ready to level up?
					<br />
					Choose an action and type your prompt to ease your pain.
				</span>
			</div>
			<div className="mt-5 flex h-12 w-1/2 overflow-hidden rounded-lg border border-neutral-800">
				<select name="Actions" className="cursor-pointer border-r border-neutral-900 bg-neutral-900 px-3 outline-none">
					<option value="summarize">Summarize</option>
				</select>
				<input
					placeholder="Custom prompt..."
					className="flex-1 px-3 outline-none"
					value={userPrompt}
					onChange={(e) => setUserPrompt(e.target.value)}
				/>
				<button
					onClick={handleRun}
					disabled={isLoading}
					className="bg-primary hover:bg-primary/80 active:bg-primary/70 cursor-pointer px-4 py-2 pr-10 pl-10 text-white disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isLoading ? "Loading..." : "Run"}
				</button>
			</div>
			<div className="mt-5 h-1/2 w-1/2 rounded-lg bg-neutral-900 p-5">
            <div className="prose prose-invert max-w-none text-sm leading-relaxed overflow-auto h-full">
                <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
        </div>
		</div>
	);
}

export { ActionSummarize };