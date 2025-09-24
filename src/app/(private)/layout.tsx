import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { SidebarButtonProps } from "@/components/layout/sidebar/sidebarButton";
import { auth } from "@/lib/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/style/globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Amaru",
	description: "Amaru - Private AI Chat Application",
};

const links: SidebarButtonProps[] = [
	{ href: "/dashboard", icon: "Book", text: "Dashboard", notification: true, Tag: "New" },
	{ href: "/logs", icon: "List", text: "Logs" },
	{ href: "/whitelist", icon: "CheckList", text: "Whitelist" },
	{ href: "/settings/profile", icon: "Settings", text: "Settings" },
];

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		redirect("/");
	}
	return (
		<html lang="en">
			<body className={`${inter.className} bg-background text-foreground flex h-screen w-full overflow-hidden`}>
				<Sidebar links={links} user={{ name: session.user.name, imageUrl: session.user.image ?? "" }} />
				<div className="h-full flex-1 overflow-y-auto p-5 pt-10">{children}</div>
			</body>
		</html>
	);
}
