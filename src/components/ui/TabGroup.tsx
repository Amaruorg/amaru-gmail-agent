"use client";

import { motion } from "motion/react";
import { TabItem } from "@/components/ui";

type TabGroupProps = {
	basePath?: string;
	tabs: {
		href: string;
		label: string;
	}[];
	className?: string;
	onTabClick?: (href: string) => void;
	activeTab?: string;
};

/**
 * TabGroup component
 *
 * - Si se pasa `activeTab`, el estado activo viene del padre (modo controlado)
 * - Si no se pasa, puede navegar con router.push normalmente
 */
function TabGroup({ tabs, className, onTabClick, activeTab }: TabGroupProps) {
	return (
		<div className={`border-tab-underline relative flex w-full gap-5 border-b-2 ${className || ""}`}>
			{tabs.map((tab) => {
				const isSelected = activeTab === tab.href; // 👈 compara con el estado activo

				const handleClick = () => {
					if (onTabClick) {
						onTabClick(tab.href);
					}
				};

				return (
					<TabItem
						key={tab.href}
						variant={isSelected ? "selected" : "unselected"}
						onClick={handleClick}
						className="relative"
					>
						{/* ✅ Animación de borde inferior */}
						{isSelected && (
							<motion.div
								layoutId="active-tab"
								className="border-foreground absolute inset-0 border-b-2"
								transition={{ type: "spring", stiffness: 300, damping: 25 }}
							/>
						)}
						<span className="relative z-10">{tab.label}</span>
					</TabItem>
				);
			})}
		</div>
	);
}

export { TabGroup, type TabGroupProps };
