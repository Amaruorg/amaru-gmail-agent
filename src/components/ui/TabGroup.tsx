"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { TabItem } from ".";

type TabGroupProps = {
	basePath?: string; // opcional
	tabs: {
		href: string;
		label: string;
	}[];
	className?: string;
};

/**
 * Tab group component for navigation. Uses Next.js router for navigation.
 *
 * Props:
 * - tabs: Array of tab objects with `href` and `label` properties. href is relative path, label is display text.
 * - basePath: Optional base path to prepend to each tab's href.
 *
 * Example:
 * ```tsx
 * <TabGroup basePath="/settings" tabs={[{ href: 'profile', label: 'Profile' }, { href: 'notifications', label: 'Notifications' }]} />
 * ```
 */
function TabGroup({ tabs, basePath = "", className }: TabGroupProps) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className={`border-tab-underline flex w-full gap-5 border-b-2 ${className}`}>
			{tabs.map((tab) => {
				const fullHref = `${basePath}/${tab.href}`.replace(/\/+$/, "").replace(/\/{2,}/g, "/") || "/";
				const isSelected = pathname === fullHref;

				return (
					<TabItem
						key={tab.href}
						variant={isSelected ? "selected" : "unselected"}
						onClick={() => router.push(fullHref)}
					>
						{isSelected && (
							<motion.div layoutId="active-tab" className="border-foreground absolute inset-0 border-b-2" />
						)}
						<span className="relative">{tab.label}</span>
					</TabItem>
				);
			})}
		</div>
	);
}

export { TabGroup, type TabGroupProps };
