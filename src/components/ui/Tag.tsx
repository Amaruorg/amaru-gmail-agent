import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";

const tagVariants = cva("inline-flex items-center rounded-full font-medium w-auto gap-2", {
	variants: {
		variant: {
			solid: "bg-primary text-white",
			outline: "border border-primary text-primary bg-transparent",
		},
		size: {
			sm: "px-3 py-1 text-xs",
			md: "px-4 py-1.5 text-sm",
			lg: "px-5 py-2 text-base",
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
	},
});

type TagVariants = VariantProps<typeof tagVariants>;

type TagProps = React.HTMLAttributes<HTMLSpanElement> &
	TagVariants & {
		text?: string;
		icon?: React.ElementType;
	};

/**
 * Variants:
 * - variant: `solid` | `outline`
 * - size: `sm` | `md` | `lg`
 *
 * Props:
 * - text?: `string` — Label text.
 * - icon?: `React.ElementType` — Optional icon component.
 * - Inherits all native <span> props.
 */
export default function Tag({ text, variant, size, className, icon: Icon, ...rest }: TagProps) {
	return (
		<span className={mergeClasses(tagVariants({ variant, size }), className)} {...rest}>
			{Icon && <Icon className="w-4 h-4" />}
			{text && <span>{text}</span>}
		</span>
	);
}

Tag.displayName = "Tag";
