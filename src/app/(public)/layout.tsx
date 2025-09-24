import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Topbar } from "@/components/layout/Topbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/style/globals.css";
import { Marquee } from "@/components/ui";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Amaru",
	description: "Amaru - Gmail Agent",
};

const tabsContent = [
	{ href: "", label: "Home" },
	{ href: "pricing", label: "Pricing" },
];

const texts = [
	"Save Hours Every Week",
	"Focus on What Matters",
	"Work Smarter, Not Harder",
	"Boost Your Workflow with AI",
];

export default async function PublicLayout({ children }: { children: ReactNode }) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		redirect("/");
	}
	return (
		<html lang="en">
			<body
				className={`${inter.className} from-background-secondary text-foreground bg-gradient-to-b from-20% to-black`}
			>
				<Marquee items={texts} />
				<Topbar basePath="/" tabs={tabsContent} />
				{children}
				<footer className="h-20 w-full bg-transparent"></footer>
			</body>
		</html>
	);
}
