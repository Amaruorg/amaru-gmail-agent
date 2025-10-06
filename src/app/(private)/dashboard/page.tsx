"use client";

import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionAnalyze } from "@/components/dashboard/ActionAnalyze";

import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { getEmailsSummary } from "@/domains/ai/actions";
import { Button } from "@/components/ui";
import { type SummaryCardProps } from "@/components/SummaryComponents/SummaryCard";
import { SummaryLayout } from "@/components/SummaryComponents/SummaryLayout";

export default function DashboardPage() {
	const { user } = useUser();
	const [summaries, setSummaries] = useState<SummaryCardProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const handleRun = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const newSummaries = summaries.slice();
			const actionCollection = await getEmailsSummary();
			const content = `# Daily Email Summary\n\n${actionCollection.actions.map((action, index) => `## Email ${index + 1}\n${action.summary}`).join("\n\n")}`;
			//TODO: replace with real summary data from backend
			const newSummary = {
				title: `Email from ${user?.name}`,
				subtitle: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
				content,
				eventList: [{ title: "Meeting with Bob", content: "Discuss project updates and next steps." }],
			};
			newSummaries.push(newSummary);
			setSummaries(newSummaries.reverse());
		} catch (error) {
			console.error("Error getting summary:", error);
		} finally {
			setIsLoading(false);
		}
	};

	//TODO: fetch real email count from backend

	return (
		<>
			<h1 className="text-3xl">Hello there, {(user?.name ?? "Unknown").split(" ")[0]}!</h1>
			<h2 className="text-2xl text-gray-500">What&apos;s on your mind?</h2>

			<div className="border-muted bg-card-background/30 mt-8 flex items-center rounded-md border px-5 py-2">
				<p className="flex-1">{`You have ${10} new emails waiting for you.`}</p>
				<Button text={isLoading ? "Loading..." : "Today summary"} size="sm" onClick={handleRun} disabled={isLoading} />
			</div>
			<SummaryLayout events={summaries} />
		</>
	);
}
