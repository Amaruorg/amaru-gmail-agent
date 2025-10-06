"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { createCalendarEvent } from "@/domains/calendar/actions";

interface EventProps {
	title: string;
	subtitle?: string;
	content: string;
	eventData: {
		eventTitle: string;
		location: string;
		description: string;
		start: string;
		end: string;
	};
}

function EventCard({ title, subtitle, content, eventData }: EventProps) {
	const [isCreating, setIsCreating] = useState(false);
	const [isCreated, setIsCreated] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSchedule = async () => {
		if (isCreating || isCreated) return;

		setIsCreating(true);
		setError(null);

		try {
			const result = await createCalendarEvent(eventData);
			
			if (result.success) {
				setIsCreated(true);
				console.log("Event created successfully:", result.link);
			} else {
				setError(result.message);
			}
		} catch (err) {
			console.error("Error scheduling event:", err);
			setError("Failed to create event");
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<div className="bg-background/30 w-full rounded-xl p-6 shadow-lg">
			<h3 className="mb-1 text-xl text-white">{title}</h3>
			{subtitle ? <p className="mb-2 text-sm md:text-sm text-gray-400">{subtitle}</p> : null}
			<div className="mb-4 text-gray-300 whitespace-pre-wrap text-sm md:text-base">{content}</div>
			
			{error && <p className="mb-2 text-status-alert text-sm">{error}</p>}
			
			<Button
				text={isCreated ? "Event Created" : isCreating ? "Creating..." : "Schedule"}
				variant={"solid"}
				size={"sm"}
				className={isCreated ? "bg-status-success/50" : "bg-accent-blue/50 hover:bg-accent-blue/60"}
				onClick={handleSchedule}
				disabled={isCreating || isCreated}
			/>
		</div>
	);
}

export { EventCard, type EventProps };
