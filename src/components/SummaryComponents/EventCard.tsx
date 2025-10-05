import { Button } from "../ui/Button";

interface EventProps {
	title: string;
	content: string;
}

function EventCard({ title, content }: EventProps) {
	return (
		<div className="bg-background/30 w-full rounded-xl p-6 shadow-lg">
			<h3 className="mb-1 text-xl text-white">{title}</h3>
			<p className="mb-4 text-gray-300">{content}</p>
			<Button
				text="Schedule"
				variant={"solid"}
				size={"sm"}
				className="bg-accent-blue/50 hover:bg-accent-blue/60"
				onClick={() => console.log(`Scheduling event: ${title}`)}
			/>
		</div>
	);
}

export { EventCard, type EventProps };
