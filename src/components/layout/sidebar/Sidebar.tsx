"use client";

import { signOut } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import Image from "next/image";
import { SidebarButton, type SidebarButtonProps } from "./sidebarButton";
import { Logout } from "@/components/Icons";

type SidebarProps = {
	links: SidebarButtonProps[];
	user: {
		name: string;
		imageUrl: string;
	};
};

/**
 * Sidebar component that includes a logo, navigation links, and a sign-out button.
 * @param {SidebarProps} sections - The sections to be displayed in the sidebar.
 * @return {JSX.Element} The rendered Sidebar component.
 */
function Sidebar({ links, user }: SidebarProps) {
	const router = useRouter();
	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};
	return (
		<div className="w-1/5 p-4">
			<div className={`bg-sidebar-background mr-5 flex h-full w-full flex-col rounded-xl`}>
				<section className="flex items-center px-7 py-5">
					<div className="flex w-full items-center gap-5">
						{user.imageUrl ? (
							<Image
								src={user.imageUrl}
								alt="User Avatar"
								className="rounded-full object-cover"
								width={40}
								height={40}
							/>
						) : (
							<div className="bg-accent-blue h-10 w-10 rounded-full" />
						)}
						<div className="text-md flex-1">{user.name}</div>
						<Button
							icon={Logout}
							onClick={handleSignOut}
							variant={"outline"}
							size={"sm"}
							className="hover:bg-foreground/10 m-0 border-0 p-2"
						/>
					</div>
				</section>
				<section className="mx-5 flex flex-col items-start justify-start gap-5 border-t border-gray-200 pt-5">
					{links.map((link) => (
						<SidebarButton
							key={link.href}
							href={link.href}
							text={link.text}
							icon={link.icon}
							notification={link.notification}
							Tag={link.Tag}
						/>
					))}
				</section>
			</div>
		</div>
	);
}

export { Sidebar };
