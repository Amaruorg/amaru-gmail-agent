import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Topbar } from "@/components/layout/Topbar";
import "@/style/globals.css";

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

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-gradient-to-b from-background-secondary from-20% to-black text-foreground`}
			>
				<Topbar tabs={tabsContent} />
				{children}
				<footer className="w-full h-20 bg-primary"></footer>
			</body>
		</html>
	);
}
