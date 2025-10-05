"use client";

import { Button } from "@/components/ui";
import MultiLineMarquee from "@/components/animations/MultiLineText";

const wordsList = [
	"Amaru",
	"AI",
	"Gmail",
	"Calendar",
	"Assistant",
	"Workflow",
	"Automation",
	"@",
	"Events",
	"Summary",
	"Focus",
	"Productivity",
	"Smart",
	"Organize",
	"Manage",
	"Time",
	"Efficiency",
	"Inbox",
	"Schedule",
	"Plan",
	"Reminders",
	"Sync",
	"Connect",
	"Integrate",
	"Optimize",
	"Google",
];

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* 🔹 Sección Home */}
			<section
				id="home"
				className="flex flex-row items-center justify-center gap-10 pt-1 pr-10 lg:min-h-[calc(100vh-5rem)]"
			>
				<div className="flex w-full flex-col gap-4 pl-40">
					<h1 className="text-left text-8xl">Amaru</h1>
					<h2 className="text-left text-4xl font-bold">Gmail Agent</h2>
					<p className="text-muted text-left">
						An intelligent email assistant inspired by the legendary Andean serpent, designed to bring order to digital
						chaos. Powered by advanced AI, it integrates with Gmail and Google Calendar to prioritize messages, automate
						repetitive tasks, and streamline your day.
					</p>
					<Button text="Get Started" variant="solid" />
				</div>

				{/* Animación del logo */}
				<div className="center mr-10 hidden flex-1 lg:block">
					<div className="flex h-full items-center justify-center">
						<div
							className="h-[570px] w-[570px] -rotate-6 bg-transparent"
							style={{
								WebkitMaskImage: "url('/svgs/amaru.svg')",
								WebkitMaskRepeat: "no-repeat",
								WebkitMaskPosition: "center",
								WebkitMaskSize: "contain",
								maskImage: "url('/svgs/amaru.svg')",
								maskRepeat: "no-repeat",
								maskPosition: "center",
								maskSize: "contain",
							}}
						>
							<MultiLineMarquee words={wordsList} color="text-primary" />
						</div>
					</div>
				</div>
			</section>

			{/* 🔹 Sección Features */}
			<section id="features" className="mt-20 flex w-full flex-col px-20">
				<div className="from-background text-foreground h-[600px] w-full rounded-2xl bg-gradient-to-b to-black p-10">
					<h1 className="text-4xl font-bold">What It Does Amaru</h1>
				</div>
			</section>
		</div>
	);
}
