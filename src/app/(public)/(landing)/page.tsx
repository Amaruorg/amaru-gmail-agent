import { Button } from "@/components/ui";

export default function HomePage() {
	return (
		<div className="flex min-h-screen w-full flex-col mt-40">
			<div className="flex flex-col gap-2 w-1/2 items-center">
				<h1 className="text-4xl font-bold">Amaru</h1>
				<h2 className="text-2xl">Gmail Agent</h2>
				<p className="text-muted">
					An intelligent email assistant inspired by the legendary Andean serpent, designed to bring order to
					digital chaos. Powered by advanced AI, it integrates with Gmail and Google Calendar to prioritize
					messages, automate repetitive tasks, and streamline your day.
				</p>
				<Button text="Get Started" variant={"solid"} />
			</div>
			<div className="w-full min-h-screen bg-section-background p-8 rounded-lg"></div>
		</div>
	);
}
