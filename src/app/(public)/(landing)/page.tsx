"use client";

import { Button, Carousel } from "@/components/ui";
import MultiLineMarquee from "@/components/animations/MultiLineText";
import Footer from "@/components/layout/Footer";

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

const slides = [
	{
		src: "/images/dashboard.png",
		alt: "Dashboard Screenshot",
		title: "Dashboard Overview",
		description:
			"Experience the core of Amaru: an intelligent dashboard that uses advanced AI to organize your emails, generate precise summaries, and manage tasks efficiently.",
	},
	{
		src: "/images/Collections.png",
		alt: "Collections Screenshot",
		title: "Smart Collections",
		description:
			"Build dynamic collections. Amaru automates the classification of your emails, articles, and projects, transforming digital chaos into an organized and productive system.",
	},
	{
		src: "/images/logs.png",
		alt: "Logs Screenshot",
		title: "Detailed History",
		description:
			"Access a complete activity history. Every interaction with Amaru is meticulously recorded, providing detailed tracking of your productivity and performance.",
	},
];

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* 🔹 Hero Section */}
			<section
				id="home"
				className="flex flex-row items-center justify-between gap-12 px-8 pt-8 lg:min-h-[calc(100vh-5rem)] lg:gap-16 lg:px-24"
			>
				<div className="flex w-full max-w-4xl flex-col gap-8">
					<div className="space-y-6">
						<h1 
							className="text-left text-6xl font-bold leading-tight lg:text-8xl" 
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Stop Wasting <br />
							<span className="text-primary">Your Time</span>
						</h1>
					</div>
					<p 
						className="text-muted max-w-2xl text-left text-lg leading-relaxed lg:text-xl" 
						style={{ fontFamily: "'DM Sans', sans-serif" }}
					>
						An intelligent email assistant inspired by the legendary Andean serpent, designed to bring order to digital
						chaos. Powered by advanced AI, it integrates with Gmail and Google Calendar to prioritize messages, automate
						repetitive tasks, and streamline your day.
					</p>
					<div className="mt-6">
						<Button text="Get Started" variant="solid" />
					</div>
				</div>

				{/* Logo Animation */}
				<div className="hidden flex-shrink-0 lg:block">
					<div className="flex h-full items-center justify-center">
						<div
							className="h-[600px] w-[600px] -rotate-6 bg-transparent"
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

			{/* 🔹 Features Section */}
			<section id="features" className="mt-24 flex w-full flex-col px-10 lg:px-20">
				<h1 
					className="mb-16 text-center text-5xl font-bold pt-10 pb-20" 
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					What Amaru Does
				</h1>
				<Carousel slides={slides} autoPlay={true} interval={7000} />
			</section>

			{/* 🔹 Footer */}
			<Footer />
		</div>
	);
}
