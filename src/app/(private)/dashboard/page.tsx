"use client";

import { useUser } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { getEmailAnalysis, getUnreadEmailCount } from "@/domains/ai/actions";
import { Button, TextArea } from "@/components/ui";
import { type SummaryCardProps } from "@/components/SummaryComponents/SummaryCard";
import { SummaryLayout } from "@/components/SummaryComponents/SummaryLayout";
import { formatSummariesMarkdown, formatDate } from "@/lib/utils/actionsFormatter";

export default function DashboardPage() {
	const { user } = useUser();
	const [summaries, setSummaries] = useState<SummaryCardProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [unreadCount, setUnreadCount] = useState<number>(0);
	const [userPrompt, setUserPrompt] = useState("");

	useEffect(() => {
		const savedSummaries = localStorage.getItem("dashboard-summaries");
		if (savedSummaries) {
			try {
				const parsed = JSON.parse(savedSummaries);
				setSummaries(parsed);
			} catch (error) {
				console.error("Error loading saved summaries:", error);
			}
		}
	}, []);

	useEffect(() => {
		if (summaries.length > 0) {
			localStorage.setItem("dashboard-summaries", JSON.stringify(summaries));
		}
	}, [summaries]);

	useEffect(() => {
		const fetchUnreadCount = async () => {
			try {
				const count = await getUnreadEmailCount();
				setUnreadCount(count);
			} catch (error) {
				console.error("Error fetching unread count:", error);
			}
		};

		fetchUnreadCount();

		// Poll every 30 seconds for updates
		const interval = setInterval(fetchUnreadCount, 30000);

		return () => clearInterval(interval);
	}, []);

	const handleRun = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const newSummaries = summaries.slice();
			const actionCollection = await getEmailAnalysis(userPrompt || undefined);

			const groups = new Map<string, any[]>();
			for (const action of actionCollection) {
				const emailId = (action as any).emailId || "(unknown)";
				if (!groups.has(emailId)) groups.set(emailId, []);
				groups.get(emailId)!.push(action);
			}

			let idx = 0;
			for (const [emailId, actions] of groups.entries()) {
				idx++;
				const summarizeAction = actions.find((a: any) => a.type === "summarize");
				const emailTitle = (summarizeAction as any)?.emailTitle;
				const category = (summarizeAction as any)?.category;
				const subject = emailTitle || ``;
				const title = emailTitle ? `${subject}` : subject;
				const subtitle = `${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} • ${emailId}`;

				const structuredString = formatSummariesMarkdown(actions);

				const eventList = actions
					.filter((a: any) => a.type === "schedule_google_calendar")
					.map((a: any) => {
						const ev = a.event || {};
						let startStr = ev.start ? formatDate(ev.start) : "(no start)";
						let endStr = ev.end ? formatDate(ev.end) : "(no end)";
						return {
							title: ev.eventTitle || "Scheduled event",
							subtitle: `${startStr} — ${endStr}`,
							content: `Location: ${ev.location || "(none)"}\n\n${ev.description || ""}`,
							eventData: {
								eventTitle: ev.eventTitle || "Event",
								location: ev.location || "",
								description: ev.description || "",
								start: ev.start,
								end: ev.end,
							},
						};
					});

				const newSummary = {
					title,
					subtitle,
					content: `${structuredString}`,
					eventList: eventList,
					category: category,
					emailId: emailId !== "(unknown)" ? emailId : undefined,
				};

				newSummaries.push(newSummary);
			}
			setSummaries(newSummaries.reverse());

			const count = await getUnreadEmailCount();
			setUnreadCount(count);
		} catch (error) {
			console.error("Error getting summary:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<h1 className="text-3xl">Hello there, {(user?.name ?? "Unknown").split(" ")[0]}!</h1>
			<h2 className="text-2xl text-gray-500">What&apos;s on your mind?</h2>

			<div className="border-muted bg-card-background/30 mt-8 flex flex-col gap-4 rounded-md border p-5">
				<div className="flex items-center">
					<p className="flex-1">
						{`You have ${unreadCount} ${unreadCount === 1 ? "new email" : "new emails"} waiting for you.`}
					</p>
					<Button
						text={isLoading ? "Loading..." : "Today summary"}
						size="sm"
						onClick={handleRun}
						disabled={isLoading}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="userPrompt" className="text-muted text-sm">
						Custom Prompt (optional)
					</label>
					<TextArea
						id="userPrompt"
						placeholder="E.g., Focus on urgent emails, or summarize only work-related content..."
						value={userPrompt}
						onChange={(e) => setUserPrompt(e.target.value)}
						autoResize
					/>
				</div>
			</div>
			<SummaryLayout events={summaries} />
		</>
	);
}
