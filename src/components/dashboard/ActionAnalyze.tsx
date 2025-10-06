"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getEmailAnalysis } from "@/domains/ai/actions";
import { JSONTree } from "react-json-tree";

type ActionAnalyzeProps = {
	summary: string;
	className?: string;
};

function ActionAnalyze({ summary: initialSummary, className }: ActionAnalyzeProps) {
	const [userPrompt, setUserPrompt] = useState("");
	const [summary, setSummary] = useState(initialSummary);
	const [isLoading, setIsLoading] = useState(false);

	const handleRun = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const newSummary = await getEmailAnalysis(userPrompt);
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
				<div className="prose prose-invert prose-sm h-full max-w-none overflow-auto text-sm leading-relaxed">
					{/* <JSONTree data={summary} /> */}
					<ReactMarkdown
						remarkPlugins={[remarkGfm as any, remarkBreaks as any]}
						components={{
							p: ({ node, ...props }: any) => (
								<p className="mb-3 whitespace-pre-wrap leading-relaxed text-sm" {...props} />
							),
							li: ({ node, ...props }: any) => (
								<li className="mb-1 ml-4 list-disc" {...props} />
							),
							pre: ({ node, ...props }: any) => (
								<pre className="bg-neutral-800 p-3 rounded-md overflow-auto text-[0.85rem]" {...props} />
							),
							h3: ({ node, ...props }: any) => (
								<h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
							),
							hr: ({ node, ...props }: any) => (
								<hr className="my-4 border-neutral-800" {...props} />
							),
							blockquote: ({ node, ...props }: any) => (
								<blockquote className="border-l-2 border-neutral-700 pl-4 italic text-neutral-300 my-3" {...props} />
							),
							ul: ({ node, ...props }: any) => (
								<ul className="ml-4 mb-3 list-disc space-y-1" {...props} />
							),
							ol: ({ node, ...props }: any) => (
								<ol className="ml-4 mb-3 list-decimal space-y-1" {...props} />
							),
						}}
					>
						{summary}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}

export { ActionAnalyze };
