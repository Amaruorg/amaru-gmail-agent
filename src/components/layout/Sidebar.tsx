"use client";

import Link from "next/link";
import { signOut } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Amaru } from "@/components/Icons";

type SidebarProps = {
	sections: { href: string; label: string }[];
};

/**
 * Sidebar component that includes a logo, navigation links, and a sign-out button.
 */
function Sidebar({ sections }: SidebarProps) {
	const router = useRouter();
	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};
	return (
		<div className="w-1/5 p-2">
			<div className={`bg-sidebar-background mr-5 flex h-full flex-col rounded-xl`}>
				<Amaru className="text-foreground mx-auto mt-5 w-50" width={50} height={50} />
				<div className="flex flex-col items-start justify-start gap-3 p-5">
					{sections.map((section) => (
						<Link key={section.href} href={section.href}>
							{section.label}
						</Link>
					))}
					<button onClick={handleSignOut} className="cursor-pointer">
						<span>Sign Out</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export { Sidebar };
