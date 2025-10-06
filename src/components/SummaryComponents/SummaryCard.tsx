import { EventCard, type EventProps } from "./EventCard";
import { Tag } from "../ui";
import { applyLabelToEmail } from "@/domains/gmail/labelActions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useState } from "react";

interface SummaryCardProps {
	title: string;
	subtitle: string;
	content: string;
	eventList: EventProps[];
	category?: string;
	emailId?: string;
}

function SummaryCard({ title, content, subtitle, eventList, category, emailId }: SummaryCardProps) {
	const [isApplyingLabel, setIsApplyingLabel] = useState(false);

	const handleApplyLabel = async () => {
		if (!category || !emailId) return;

		setIsApplyingLabel(true);
		try {
			const result = await applyLabelToEmail(emailId, category);
			if (result.success) {
				console.log("Label applied successfully");
			} else {
				console.error("Failed to apply label");
			}
		} catch (error) {
			console.error("Error applying label:", error);
		} finally {
			setIsApplyingLabel(false);
		}
	};

	// Generate a color based on category name
	const getCategoryColor = (cat: string): string => {
		const colors = [
			"bg-purple-700",
			"bg-blue-700",
			"bg-green-700",
			"bg-yellow-700",
			"bg-red-700",
			"bg-pink-700",
			"bg-indigo-700",
			"bg-teal-700",
		];

		// Simple hash function to consistently assign colors
		let hash = 0;
		for (let i = 0; i < cat.length; i++) {
			hash = cat.charCodeAt(i) + ((hash << 5) - hash);
		}

		return colors[Math.abs(hash) % colors.length];
	};

	return (
		<div className="bg-card-background w-full rounded-xl p-6 shadow-lg">
			<div className="mb-6">
				<h3 className="text-foreground mb-1 text-2xl md:text-3xl">{title}</h3>
				<div className="flex items-center gap-3">
					<p className="text-muted text-sm md:text-base">{subtitle}</p>
					{category && (
						<Tag
							text={category}
							size="sm"
							className={getCategoryColor(category)}
							showPlusOnHover={Boolean(emailId)}
							onApply={emailId ? handleApplyLabel : undefined}
							isLoading={isApplyingLabel}
						/>
					)}
				</div>
			</div>
			<ReactMarkdown
				remarkPlugins={[remarkGfm as any, remarkBreaks as any]}
				components={{
					p: ({ node, ...props }: any) => (
						<p className="mb-3 text-sm leading-relaxed whitespace-pre-wrap md:text-base" {...props} />
					),
					li: ({ node, ...props }: any) => <li className="mb-1 ml-4 list-disc" {...props} />,
					pre: ({ node, ...props }: any) => (
						<pre className="overflow-auto rounded-md bg-neutral-800 p-3 text-[0.85rem]" {...props} />
					),
					h3: ({ node, ...props }: any) => <h3 className="mt-4 mb-2 text-base font-semibold md:text-lg" {...props} />,
					hr: ({ node, ...props }: any) => <hr className="my-4 border-neutral-800" {...props} />,
					blockquote: ({ node, ...props }: any) => (
						<blockquote className="my-3 border-l-2 border-neutral-700 pl-4 text-neutral-300 italic" {...props} />
					),
					ul: ({ node, ...props }: any) => <ul className="mb-3 ml-4 list-disc space-y-1" {...props} />,
					ol: ({ node, ...props }: any) => <ol className="mb-3 ml-4 list-decimal space-y-1" {...props} />,
				}}
			>
				{content}
			</ReactMarkdown>
			<div className="mt-4 flex gap-4">
				{eventList.map((event, index) => (
					<EventCard key={index} {...event} />
				))}
			</div>
		</div>
	);
}

export { SummaryCard, type SummaryCardProps };
