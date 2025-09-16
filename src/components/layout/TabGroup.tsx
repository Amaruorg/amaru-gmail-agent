"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TabItem } from "../ui";

type TabGroupProps = {
	tabs: {
		href: string;
		label: string;
	}[];
};

/**
 * A tab group component that displays a list of tabs and highlights the selected tab.
 */
function TabGroup({ tabs }: TabGroupProps) {
	const router = useRouter();
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const currentPage = segments[segments.length - 1];

	return (
		<div className={`flex border-b-2 border-option-line gap-5`}>
			{tabs.map((tab) => {
				const isSelected = currentPage === tab.href;
				return (
					<TabItem
						key={tab.href}
						variant={isSelected ? "selected" : "unselected"}
						onClick={() => router.push(tab.href)}
					>
						{isSelected && (
							<motion.div layoutId="active-tab" className="absolute inset-0 border-b-2 border-foreground" />
						)}
						<span className="relative">{tab.label}</span>
					</TabItem>
				);
			})}
		</div>
	);
}

export { TabGroup, type TabGroupProps };
