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
	onlyIcon?: boolean;
	type?: "button" | "link";
	onClick?: () => void;
};

function SidebarButton({
	text,
	href,
	icon: icon,
	notification,
	Tag,
	onlyIcon,
	type = "link",
	onClick,
}: SidebarButtonProps) {
	const pathname = usePathname();
	const Icon = Icons[icon];
	const isActive = pathname === href;

	return (
		<div
			className={`hover:bg-foreground/10 rounded-lg transition-all duration-300 ${isActive ? "bg-foreground/10 text-foreground" : "text-foreground/60"} w-full`}
		>
			{type === "link" ? (
				<Link href={href}>
					<div className="flex w-full items-center">
						<div className="flex shrink-0 items-center justify-center p-2">
							<Icon />
						</div>
						<div
							className={`flex flex-1 items-center overflow-hidden transition-all duration-300 ${onlyIcon ? "max-w-0 scale-95 opacity-0" : "max-w-[200px] scale-100 opacity-100"}`}
						>
							<div className="flex flex-1 gap-3 px-2">
								<span className="whitespace-nowrap">{text}</span>
								{Tag && (
									<div id="tag" className="bg-sidebar-tag-background rounded-lg px-2 py-1 text-xs">
										{Tag}
									</div>
								)}
							</div>
							{notification && <div className="bg-sidebar-notification mr-2 h-2 w-2 shrink-0 rounded-full"></div>}
						</div>
					</div>
				</Link>
			) : (
				<button onClick={onClick} className="flex w-full items-center">
					<div className="flex shrink-0 items-center justify-center p-2">
						<Icon />
					</div>
					<div
						className={`flex flex-1 overflow-hidden transition-all duration-300 ${onlyIcon ? "max-w-0 scale-95 opacity-0" : "max-w-[200px] scale-100 opacity-100"}`}
					>
						<span className="whitespace-nowrap">{text}</span>
					</div>
				</button>
			)}
		</div>
	);
}

export { SidebarButton, type SidebarButtonProps };
