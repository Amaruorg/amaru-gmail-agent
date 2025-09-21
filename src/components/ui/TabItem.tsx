import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";

const TabVariants = cva("relative text-lg transition-colors p-3 px-10", {
	variants: {
		variant: {
			selected: "text-foreground hover:text-foreground cursor-default",
			unselected: "text-muted hover:text-foreground/80 cursor-pointer active:text-foreground",
		},
	},
	defaultVariants: {
		variant: "unselected",
	},
});

type TabVariants = VariantProps<typeof TabVariants>;

type TabProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	TabVariants & {
		children: React.ReactNode;
	};

/**
 * Tab item component.
 *
 * Variants:
 * - variant: `selected` | `unselected`
 *
 * Props:
 * - Inherits all native button props.
 */
function TabItem({ variant, children, ...rest }: TabProps) {
	return (
		<button className="flex w-full items-center justify-center" {...rest}>
			<div className={mergeClasses(TabVariants({ variant }))}>{children}</div>
		</button>
	);
}

export { TabItem, type TabProps };
