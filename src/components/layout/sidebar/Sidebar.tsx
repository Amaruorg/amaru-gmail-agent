"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import Image from "next/image";
import { SidebarButton, type SidebarButtonProps } from "@/components/layout";
import { ArrowsLeft, ArrowsRight } from "@/components/Icons";
import { signOut } from "@/domains/auth/actions";

type SidebarProps = {
	links: SidebarButtonProps[];
	user: {
		name: string;
		imageUrl: string;
	};
};

/**
 * Sidebar component that includes a logo, navigation links, and a sign-out button.
 */
function Sidebar({ links, user }: SidebarProps) {
	const [isMinimized, setIsMinimized] = useState(false);
	const router = useRouter();

	const handleMinimize = () => {
		console.log("Minimize button clicked: ", !isMinimized);
		setIsMinimized((prev) => !prev);
	};

	const handleSignOut = async () => {
		try {
			await signOut();
			router.push("/");
		} catch (error) {
			console.error("Error during sign-out:", error);
		}
	};

	return (
		<nav className={`mr-5 flex transition-all duration-300 ease-in-out ${isMinimized ? "w-32" : "w-80"} p-4`}>
			<div
				className={`bg-sidebar-background mr-2 flex h-full flex-col rounded-xl p-0 transition-all duration-300 ${isMinimized ? "w-22" : "w-full"}`}
			>
				{/* Profile */}
				<section className="ml-2.5 flex items-center px-3 py-5">
					<div className={`flex items-center transition-all duration-300 ${isMinimized ? "gap-0" : "gap-3"} w-full`}>
						{/* Avatar */}
						{user.imageUrl ? (
							<Image
								src={user.imageUrl}
								alt="User Avatar"
								className="shrink-0 rounded-full object-cover"
								width={36}
								height={36}
							/>
						) : (
							<div className="bg-primary text-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
								{user.name.charAt(0)}
							</div>
						)}

						{/* Name and minimize button with transition */}
						<div
							className={`flex items-center overflow-hidden transition-all duration-300 ${isMinimized ? "max-w-0 scale-95 opacity-0" : "w-full scale-100 opacity-100"}`}
						>
							<div className="text-md flex flex-1 flex-col overflow-hidden text-ellipsis whitespace-nowrap first-letter:uppercase">
								<span className="truncate capitalize">{user.name}</span>
								<span className="text-primary text-xs">Pro</span>
							</div>
							<Button
								icon={ArrowsLeft}
								onClick={handleMinimize}
								variant="outline"
								size="sm"
								className="text-foreground/40 hover:bg-foreground/10 hover:text-foreground/80 m-0 mr-2 cursor-e-resize border-0 p-2"
							/>
						</div>
					</div>
				</section>

				{/* Links */}
				<section className="mx-5 flex flex-col items-start justify-start gap-5 overflow-hidden border-t border-gray-200 pt-5">
					{links.map((link) => (
						<SidebarButton
							key={link.href}
							href={link.href}
							text={link.text}
							icon={link.icon}
							notification={link.notification}
							Tag={link.Tag}
							onlyIcon={isMinimized}
							type="link"
						/>
					))}
				</section>
				<button className="flex flex-1" onClick={handleMinimize} />
				<section className="mx-5 flex flex-col items-start justify-start overflow-hidden border-t border-gray-200 pt-5 pb-5">
					<SidebarButton
						key={"logout"}
						href={"/"}
						text={"Sign Out"}
						icon={"Logout"}
						onlyIcon={isMinimized}
						type="button"
						onClick={handleSignOut}
					/>
				</section>
			</div>

			{/* Expand button */}
			{isMinimized && (
				<div className="py-5">
					<Button
						icon={ArrowsRight}
						onClick={handleMinimize}
						variant={"outline"}
						size={"sm"}
						className="text-foreground/40 hover:text-foreground/80 m-0 cursor-e-resize border-0 p-2 hover:bg-transparent"
					/>
				</div>
			)}
		</nav>
	);
}

export { Sidebar };
