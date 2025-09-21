"use client";

import { signOut } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Amaru } from "@/components/Icons";

type SidebarProps = {
	sections: { href: string; label: string }[];
};

/**
 * Sidebar component that includes a logo, navigation links, and a sign-out button.
 * @param {SidebarProps} sections - The sections to be displayed in the sidebar.
 * @return {JSX.Element} The rendered Sidebar component.
 */
function Sidebar({ sections }: SidebarProps) {
	const router = useRouter();
	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};
	return (
		<div className={`flex flex-col bg-sidebar-background h-full w-1/5`}>
			<div className="border-2 border-blue-500">
				<Amaru className="text-foreground w-50" width={50} height={50} />
			</div>
			<div className="flex flex-col justify-start items-start p-5 gap-3 border-2 border-blue-500">
				{sections.map((section) => (
					<Link key={section.href} href={section.href}>
						{section.label}
					</Link>
				))}
			</div>
			<div className="border-2 border-blue-500">
				<Button text="Sign Out" onClick={handleSignOut} variant={"solid"} size={"sm"} />
			</div>
		</div>
	);
}

export { Sidebar };
