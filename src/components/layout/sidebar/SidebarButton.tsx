"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import * as Icons from "@/components/Icons";

type SidebarButtonProps = {
	text: string;
	href: string;
	notification?: boolean;
	Tag?: string;
	icon: keyof typeof Icons;
};

function SidebarButton({ text, href, icon: icon, notification, Tag }: SidebarButtonProps) {
	const pathname = usePathname();
	const Icon = Icons[icon];
	const isActive = pathname === href;
	console.log(pathname);

	return (
		<Link href={href} className={`hover:bg-foreground/10 w-full rounded-lg p-2 ${isActive ? "bg-foreground/10" : ""}`}>
			<div className="flex items-center pr-2">
				<div className="flex flex-1 gap-2">
					<Icon />
					<span>{text}</span>
					{Tag ? (
						<div id="tag" className="bg-status-success/20 rounded-lg px-2 py-1 text-xs">
							{Tag}
						</div>
					) : null}
				</div>
				{notification ? <div id="amount" className="bg-status-alert h-2 w-2 rounded-full"></div> : null}
			</div>
		</Link>
	);
}

export { SidebarButton, type SidebarButtonProps };