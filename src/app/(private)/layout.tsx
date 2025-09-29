import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Sidebar, SidebarButtonProps } from "@/components/layout";
import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "@/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Amaru",
	description: "Amaru - Private AI Gmail Agent",
};

const links: SidebarButtonProps[] = [
	{ href: "/dashboard", icon: "Book", text: "Dashboard", notification: true, Tag: "New" },
	{ href: "/logs", icon: "List", text: "Logs" },
	{ href: "/whitelist", icon: "CheckList", text: "Whitelist" },
	{ href: "/settings/profile", icon: "Settings", text: "Settings" },
];

export default async function PrivateLayout({ children }: { children: ReactNode }) {
	const headersList = await headers();
	const session = await authService.getSession(headersList);

	if (!session) {
		redirect("/");
	}

	return (
		<html lang="en">
			<body className={`${inter.className} bg-background text-foreground flex h-screen w-full overflow-hidden`}>
				<Sidebar links={links} user={{ name: session.user.name ?? "Unknown", imageUrl: session.user.image ?? "" }} />
				<div className="h-full flex-1 overflow-y-auto p-5 pt-10">{children}</div>
			</body>
		</html>
	);
}
