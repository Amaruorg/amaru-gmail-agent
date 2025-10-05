import { EventCard, type EventProps } from "./EventCard";
import ReactMarkdown from "react-markdown";

interface SummaryCardProps {
	title: string;
	subtitle: string;
	content: string;
	eventList: EventProps[];
}

function SummaryCard({ title, content, subtitle, eventList }: SummaryCardProps) {
	return (
		<div className="bg-card-background w-full rounded-xl p-6 shadow-lg">
			<h3 className="text-foreground mb-1 text-3xl">{title}</h3>
			<p className="text-muted mb-6">{subtitle}</p>
			<ReactMarkdown>{content}</ReactMarkdown>
			<div className="mt-4 flex gap-4">
				{eventList.map((event, index) => (
					<EventCard key={index} {...event} />
				))}
			</div>
		</div>
	);
}

export { SummaryCard, type SummaryCardProps };
