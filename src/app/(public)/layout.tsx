import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/styles/globals.css";
import { PublicLayoutClient } from "@/app/(public)/PublicLayoutClient";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
	title: "Amaru",
	description: "Amaru - Private AI Gmail Agent",
	icons: {
		icon: "/favicon.png",
	},
};

const tabsContent = [
	{ href: "#home", label: "Home" },
	{ href: "#features", label: "What It Does" },
];

const texts = [
	"Save Hours Every Week",
	"Focus on What Matters",
	"Work Smarter, Not Harder",
	"Boost Your Workflow with AI",
	"Transform Your Inbox",
	"Automate Repetitive Tasks",
];

export default async function PublicLayout({ children }: { children: ReactNode }) {
	if (process.env.NODE_ENV === "development") {
		const headersList = await headers();
		const session = await authService.getSession(headersList);
		if (session) redirect("/dashboard");
	}

	return (
		<html lang="en">
			<body
				className={`${inter.className} from-background-secondary text-foreground bg-gradient-to-b from-20% to-black`}
			>
				<PublicLayoutClient tabs={tabsContent} texts={texts}>
					{children}
				</PublicLayoutClient>
			</body>
		</html>
	);
}
