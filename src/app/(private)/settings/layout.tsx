import { ReactNode } from "react";
import { TabGroup } from "@/components/ui";

const tabsContent = [
	{ href: "profile", label: "Profile" },
	{ href: "notifications", label: "Notifications" },
	{ href: "data-privacy", label: "Data and Privacy" },
];

export default async function SettingsPage({ children }: { children: ReactNode }) {
	return (
		<div>
			<h1 className="text-3xl mb-10">Settings</h1>
			<TabGroup basePath="/settings" tabs={tabsContent} />
			<div className="p-10">{children}</div>
		</div>
	);
}
