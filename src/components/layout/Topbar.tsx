"use client";

import { signInSocial } from "@/lib/actions/auth-actions";
import { Amaru, Google } from "@/components/Icons";
import { Button, TabGroup, type TabGroupProps } from "@/components/ui";

type TopbarProps = TabGroupProps;

/**
 * Topbar component that includes a logo, tab navigation, and a sign-in button.
 * @param {TabGroupProps} tabs - The tabs to be displayed in the tab group.
 * @return {JSX.Element} The rendered Topbar component.
 */
function Topbar({ tabs }: TabGroupProps) {
	const handleSignIn = async () => {
		await signInSocial("google");
	};
	return (
		<div className={`flex bg-transparent px-5 pt-5`}>
			<Amaru className="text-foreground w-50" width={50} height={50} />
			<div className="w-full" />
			<TabGroup tabs={tabs} />
			<div className="w-full" />
			<Button
				text="Google"
				icon={Google}
				variant="outline"
				size="sm"
				className="border-foreground hover:bg-foreground/5 bg-transparent active:bg-foreground/10"
				onClick={handleSignIn}
			/>
		</div>
	);
}

export { Topbar, type TopbarProps };
