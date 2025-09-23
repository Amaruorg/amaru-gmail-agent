import { ReactNode } from "react";
import { TabGroup } from "@/components/ui";

const tabsContent = [
	{ href: "profile", label: "Profile" },
	{ href: "notifications", label: "Notifications" },
	{ href: "privacy", label: "Data and Privacy" },
];

export default async function SettingsPage({ children }: { children: ReactNode }) {
	return (
		<div>
			<h1 className="mb-10 text-3xl">Settings</h1>
			<TabGroup basePath="/settings" tabs={tabsContent} />
			<div className="p-10">{children}</div>
		</div>
	);
}
