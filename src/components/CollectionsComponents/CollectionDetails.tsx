"use client";

import { useState } from "react";
import { getEmailsSummary } from "@/domains/ai/actions";
import { type CollectionCardProps } from "./CollectionCard";
import { Button } from "../ui";
import { ArrowsRight, Trash } from "../Icons";
import Markdown from "react-markdown";

const CollectionDetails = ({ collection, onClose }: { collection: CollectionCardProps; onClose: () => void }) => {
	const [summary, setSummary] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleRun = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const newSummary = await getEmailsSummary();
			setSummary(newSummary);
		} catch (error) {
			console.error("Error getting summary:", error);
		} finally {
			setIsLoading(false);
		}
	};

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
						className="text-status-alert/60 hover:text-status-alert/80 active:text-status-alert/80"
					/>
				</div>
				<h2 className="text-foreground text-2xl font-bold">{collection.title}</h2>
				<p className="text-muted mb-4">{collection.description}</p>
				<p className="text-muted text-sm">Details for ID: {collection.id}</p>
			</div>
			<div className="mt-8">
				<Button
					text={isLoading ? "Loading..." : "Generate Summary"}
					size="sm"
					onClick={handleRun}
					disabled={isLoading}
					className="m-0"
				/>
			</div>
			<div className="">
				{summary && (
					<div className="mt-4">
						<h3 className="mb-4 text-lg">Summary:</h3>
						<Markdown>{summary}</Markdown>
					</div>
				)}
			</div>
		</div>
	);
};

export { CollectionDetails };
