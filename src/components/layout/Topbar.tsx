"use client";

import { signInSocial } from "@/domains/auth/actions";
import { Amaru, Google } from "@/components/Icons";
import { Button, TabGroup, type TabGroupProps } from "@/components/ui";

type TopbarProps = TabGroupProps;

/**
 * Topbar component that includes a logo, tab navigation, and a sign-in button.
 */
function Topbar({ tabs, activeTab, onTabClick, className }: TopbarProps) {
	const handleSignIn = async () => {
		await signInSocial("google");
	};

	return (
		<div className={`flex items-center bg-transparent px-5 pt-5`}>
			<div className="flex-1 items-center pr-10">
				<Amaru className="text-foreground" width={50} height={50} />
			</div>

			<div className="flex flex-1 justify-center">
				<TabGroup
					className={className || "justify-center"}
					tabs={tabs}
					activeTab={`#${activeTab}`}
					onTabClick={onTabClick}
				/>
			</div>

			<div className="flex flex-1 justify-end">
				<Button
					text="Google"
					icon={Google}
					variant="outline"
					size="sm"
					className="border-foreground hover:bg-foreground/5 active:bg-foreground/10 bg-transparent"
					onClick={handleSignIn}
				/>
			</div>
		</div>
	);
}

export { Topbar, type TopbarProps };
