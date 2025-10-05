"use client";

import { ReactNode, useEffect, useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Marquee } from "@/components/ui";

export function PublicLayoutClient({
	children,
	tabs,
	texts,
}: {
	children: ReactNode;
	tabs: { href: string; label: string }[];
	texts: string[];
}) {
	const [activeTab, setActiveTab] = useState(tabs[0]?.href.replace("#", "") || "home");

	useEffect(() => {
		let currentVisibleSection = activeTab;

		const observer = new IntersectionObserver(
			(entries) => {
				let newVisibleSection = null;
				for (const entry of entries) {
					if (entry.isIntersecting) {
						newVisibleSection = entry.target.id;
					}
				}
				if (newVisibleSection && newVisibleSection !== currentVisibleSection) {
					setActiveTab(newVisibleSection);
					currentVisibleSection = newVisibleSection;
				} else if (newVisibleSection) {
				}
			},
			{
				root: null,
				rootMargin: "-20% 0px -20% 0px",
				threshold: 0.2,
			},
		);

		// Observa todas las secciones
		tabs.forEach((tab) => {
			const section = document.querySelector(tab.href);
			if (section) observer.observe(section);
		});

		return () => observer.disconnect();
	}, [tabs]);

	const handleTabClick = (href: string) => {
		const id = href.replace("#", "");
		setActiveTab(id);

		if (id === "home") {
			const fixedContainer = document.getElementById("marquee") as HTMLElement;
			if (fixedContainer) {
				const scrollToY = fixedContainer.offsetHeight;
				window.scrollTo({ top: -scrollToY, behavior: "smooth" });
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
			return;
		}

		const el = document.querySelector(href);
		if (el) {
			const topbar = document.querySelector("header, .topbar, .sticky") as HTMLElement;
			const yOffset = topbar ? -topbar.offsetHeight : -80;
			const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	return (
		<>
			<div id="marquee">
				<Marquee items={texts} />
			</div>
			<div className="border-border sticky top-0 z-10 w-full bg-transparent">
				<Topbar basePath="/" tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
			</div>
			{children}
		</>
	);
}
