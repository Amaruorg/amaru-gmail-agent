import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils/tailwind";

const tagVariants = cva("inline-flex items-center rounded-full font-medium w-fit gap-2 transition-all", {
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
		clickable: {
			true: "cursor-pointer hover:brightness-125 active:scale-95",
			false: "",
		},
	},
	defaultVariants: {
		variant: "solid",
		size: "md",
		clickable: false,
	},
});

type TagVariants = VariantProps<typeof tagVariants>;

type TagProps = React.HTMLAttributes<HTMLSpanElement> &
	TagVariants & {
		text?: string;
		icon?: React.ElementType;
		onApply?: () => void | Promise<void>;
		isLoading?: boolean;
		showPlusOnHover?: boolean;
	};

/**
 * Variants:
 * - variant: `solid` | `outline`
 * - size: `sm` | `md` | `lg`
 * - clickable: `true` | `false` - If true, shows hover effects
 *
 * Props:
 * - text?: `string` — Label text.
 * - icon?: `React.ElementType` — Optional icon component.
 * - onApply?: `() => void | Promise<void>` — Handler when tag is clicked (for applying labels)
 * - isLoading?: `boolean` — Shows loading state
 * - showPlusOnHover?: `boolean` — Shows + icon on hover (for label application)
 * - Inherits all native <span> props.
 */
function Tag({
	text,
	variant,
	size,
	className,
	icon: Icon,
	onApply,
	isLoading,
	showPlusOnHover,
	onClick,
	...rest
}: TagProps) {
	const [isHovered, setIsHovered] = useState(false);
	const isClickable = Boolean(onApply || onClick);

	const handleClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
		if (isLoading) return;

		if (onApply) {
			await onApply();
		}

		if (onClick) {
			onClick(e);
		}
	};

	return (
		<span
			className={mergeClasses(
				tagVariants({ variant, size, clickable: isClickable }),
				isLoading && "opacity-60 cursor-wait",
				className
			)}
			onClick={handleClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			{...rest}
		>
			{Icon && <Icon className="h-4 w-4" />}
			{text && <span>{isLoading ? "Applying..." : text}</span>}
			{showPlusOnHover && isHovered && !isLoading && (
				<span className="ml-1 text-lg font-bold leading-none">+</span>
			)}
		</span>
	);
}

Tag.displayName = "Tag";

export { Tag, type TagProps };
