"use client";

import { useState, useEffect } from "react";
import { getCollectionAnalysis } from "@/domains/ai/actions";
import { formatSummariesMarkdown, formatDate } from "@/lib/utils/actionsFormatter";
import { type CollectionCardProps } from "./CollectionCard";
import { type CollectionData } from "@/app/(private)/collections/CreateCollectionModal";
import { Button } from "../ui";
import { ArrowsRight, Trash } from "../Icons";
import { SummaryLayout } from "../SummaryComponents/SummaryLayout";
import { type SummaryCardProps } from "../SummaryComponents/SummaryCard";

type CollectionDetailsProps = {
	collection: CollectionCardProps & {
		filterData: CollectionData;
		actions?: any[];
		isLoading?: boolean;
	};
	onClose: () => void;
	onRun: (id: string) => void;
	onDelete: (id: string) => void;
};

const CollectionDetails = ({ collection, onClose, onRun, onDelete }: CollectionDetailsProps) => {
	const [summaries, setSummaries] = useState<SummaryCardProps[]>([]);

	const handleRun = async () => {
		if (collection.isLoading) return;

		try {
			// Trigger the collection run from parent
			onRun(collection.id);
		} catch (error) {
			console.error("Error triggering collection:", error);
		}
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this collection?")) {
			onDelete(collection.id);
		}
	};

	// Process actions into summaries when they change
	useEffect(() => {
		if (collection.actions && collection.actions.length > 0) {
			const newSummaries: SummaryCardProps[] = [];
			
			// Group actions by emailId
			const groups = new Map<string, any[]>();
			for (const action of collection.actions) {
				const emailId = (action as any).emailId || "(unknown)";
				if (!groups.has(emailId)) groups.set(emailId, []);
				groups.get(emailId)!.push(action);
			}

			// Build a summary entry for each emailId
			let idx = 0;
			for (const [emailId, actions] of groups.entries()) {
				idx++;
				const summarizeAction = actions.find((a: any) => a.type === "summarize");
				const emailTitle = (summarizeAction as any)?.emailTitle;
				const category = (summarizeAction as any)?.category;
				const subject = emailTitle || `Email ${idx}`;
				const title = emailTitle ? `${subject} • Email ${idx}` : subject;
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

				newSummaries.push({
					title,
					subtitle,
					content: structuredString,
					eventList,
					category: category,
					emailId: emailId !== "(unknown)" ? emailId : undefined,
				});
			}
			setSummaries(newSummaries.reverse());
		}
	}, [collection.actions]);

	return (
		<div className="flex h-full flex-col px-6">
			<div className="flex-shrink-0">
				<div className="mb-4 flex items-center">
					<div className="flex-1">
						<Button
							onClick={onClose}
							icon={ArrowsRight}
							variant="ghost"
							size="sm"
							className="text-muted hover:text-foreground active:text-foreground m-0 p-1"
						/>
					</div>
					<Button
						icon={Trash}
						size="sm"
						variant={"ghost"}
						onClick={handleDelete}
						className="text-status-alert/60 hover:text-status-alert/80 active:text-status-alert/80"
					/>
				</div>
				<h2 className="text-foreground text-2xl font-bold">{collection.title}</h2>
				<p className="text-muted mb-4">{collection.description}</p>
				<div className="text-muted mb-4 text-sm">
					<p>Filter: {collection.filterData.filter}</p>
					<p>Values: {collection.filterData.filterValues.join(", ")}</p>
					<p>Interval: {collection.filterData.interval || "All"} days</p>
				</div>
			</div>
			<div className="mt-8">
				<Button
					text={collection.isLoading ? "Loading..." : "Generate Summary"}
					size="sm"
					onClick={handleRun}
					disabled={collection.isLoading}
					className="m-0"
				/>
			</div>
			<div className="mt-4">
				{summaries.length > 0 && <SummaryLayout events={summaries} />}
			</div>
		</div>
	);
};

export { CollectionDetails };
