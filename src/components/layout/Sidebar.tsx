"use client";

import Link from "next/link";
import { signOut } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
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
		<div className="w-1/8 p-2">
			<div className="bg-sidebar-background mr-5 flex h-full flex-col rounded-xl">
				<Amaru className="text-foreground mx-auto mt-5" width={50} height={50} />
				<div className="mt-5 flex w-full flex-col justify-start gap-3 px-4">
					{sections.map((section) => (
						<Link
							key={section.href}
							href={section.href}
							className="bg-primary hover:bg-primary/80 active:bg-primary/70 w-full overflow-hidden rounded py-2 text-center text-white"
						>
							{section.label}
						</Link>
					))}

					<button
						onClick={handleSignOut}
						className="bg-background hover:bg-background/80 active:bg-background/70 w-full cursor-pointer overflow-hidden rounded py-2 text-white"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
}

export { Sidebar };
