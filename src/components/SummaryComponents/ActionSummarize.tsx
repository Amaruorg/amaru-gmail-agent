"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getEmailsSummary } from "@/domains/ai/actions";
import { Button } from "@/components/ui";
import type { ActionCollection } from "@/domains/gmail/schema";

type ActionSummarizeProps = {
	summary: string;
	className?: string;
};

function ActionSummarize({ summary: initialSummary, className }: ActionSummarizeProps) {
	const [userPrompt, setUserPrompt] = useState("");
	const [actionCollection, setActionCollection] = useState<ActionCollection | null>(null);
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
			setActionCollection(null);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`${className}`}>
			<div className="mt-5 flex h-12 w-1/2 overflow-hidden rounded-lg border border-neutral-800">
				<Button text={isLoading ? "Loading..." : "Today summary"} size="sm" onClick={handleRun} disabled={isLoading} />
			</div>
			<div className="w-full rounded-lg bg-neutral-900 w-1/2 p-4 sm:p-6 min-h-[400px]">
				<div className="prose prose-invert max-w-none text-sm leading-relaxed h-full overflow-auto">
					{actionCollection ? (
						<div className="space-y-6">
							<div className="border-b border-neutral-700 pb-4">
								<h3 className="text-lg sm:text-xl font-semibold text-white">Email Summaries Collection</h3>
								<p className="text-sm text-neutral-400 mt-2">
									Total Actions: {actionCollection.metadata.total} |
									Summary Actions: {actionCollection.metadata.byType.summary || 0} |
									Last Updated: {new Date(actionCollection.metadata.lastUpdated).toLocaleString()}
								</p>
							</div>

							<div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
								{actionCollection.actions.map((action, index) => (
									<div key={action.id} className="bg-neutral-800 rounded-lg p-4">
										<div className="border-b border-neutral-700 pb-3 mb-4">
											<h4 className="text-md font-medium text-white">{action.name}</h4>
											<p className="text-xs text-neutral-400">
												Status: <span className="capitalize">{action.status}</span> |
												Processing: {action.metadata.processingTime}ms
											</p>
										</div>

										{action.emails.length > 0 && (
											<div className="mb-4">
												<h5 className="text-sm font-medium text-white mb-2">Email Details:</h5>
												<div className="bg-neutral-700 p-3 rounded text-xs space-y-1">
													<div><strong>ID:</strong> {action.emails[0].id}</div>
													{action.emails[0].subject && <div><strong>Subject:</strong> {action.emails[0].subject}</div>}
													{action.emails[0].from && <div><strong>From:</strong> {action.emails[0].from}</div>}
													{action.emails[0].threadId && <div><strong>Thread:</strong> {action.emails[0].threadId}</div>}
												</div>
											</div>
										)}

										<div className="mb-4">
											<h5 className="text-sm font-medium text-white mb-2">Summary:</h5>
											<div className="prose prose-invert prose-sm max-w-none">
												<ReactMarkdown>{action.summary}</ReactMarkdown>
											</div>
										</div>
									</div>
								))}
							</div>

							<details className="mt-6">
								<summary className="cursor-pointer text-neutral-400 hover:text-white text-sm">
									View Raw JSON
								</summary>
								<pre className="mt-3 p-4 bg-neutral-800 rounded text-xs overflow-auto max-h-96">
									{JSON.stringify(actionCollection, null, 2)}
								</pre>
							</details>
						</div>
					) : (
						<ReactMarkdown>{summary}</ReactMarkdown>
					)}
				</div>
			</div>
		</div>
	);
}

export { ActionSummarize };
