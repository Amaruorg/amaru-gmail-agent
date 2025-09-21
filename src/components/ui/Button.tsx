import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md transition-colors font-medium w-fit gap-2 m-2 h-fit",
	{
		variants: {
			size: {
				sm: "px-4 py-2 text-sm",
				md: "px-6 py-3 text-base",
				lg: "px-8 py-4 text-lg",
			},
			variant: {
				solid: "",
				outline: "border-2 ",
				ghost: "",
				link: "underline-offset-4 hover:underline",
			},
			style: {
				default: "bg-primary text-white border-primary",
				danger: "bg-status-alert text-white border-status-alert",
			},
			disabled: {
				true: "opacity-50 cursor-not-allowed",
				false: "cursor-pointer",
			},
		},
		compoundVariants: [
			{
				variant: "solid",
				style: "default",
				className: "bg-primary text-white hover:bg-primary/80 active:bg-primary/70",
			},
			{
				variant: "outline",
				style: "default",
				className: "hover:bg-primary/10 bg-transparent active:bg-primary/20",
			},
			{
				variant: "ghost",
				style: "default",
				className: "hover:bg-primary/20 bg-transparent active:bg-primary/30",
			},
			{
				variant: "link",
				style: "default",
				className: "hover:text-primary/80 bg-transparent active:text-primary/70",
			},
			{
				variant: "solid",
				style: "danger",
				className: "bg-status-alert text-white hover:bg-status-alert/80 active:bg-status-alert/70",
			},
			{
				variant: "outline",
				style: "danger",
				className: "hover:bg-status-alert/10 bg-transparent active:bg-status-alert/20",
			},
			{
				variant: "ghost",
				style: "danger",
				className: "hover:bg-status-alert/10 bg-transparent active:bg-status-alert/20",
			},
			{
				variant: "link",
				style: "danger",
				className: "hover:text-status-alert/80 bg-transparent active:text-status-alert/70",
			},
		],
		defaultVariants: {
			size: "md",
			variant: "solid",
			style: "default",
			disabled: false,
		},
	},
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

// extend native button props with our custom props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants & {
		text?: string;
		icon?: React.ElementType;
	};

/**
 * Variants:
 * - variant: `solid`, `outline`, `ghost`, `link`
 * - style: `default`, `danger`
 * - size: `sm`, `md`, `lg`
 * - disabled: boolean
 *
 * Props:
 * - text?: `string` — Button label.
 * - icon?: `React.ElementType` — Optional icon component.
 * - Inherits all native button props.
 */
function Button({
	text,
	icon: Icon,
	size,
	variant,
	style,
	disabled,
	className,
	type = "button",
	...rest
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={mergeClasses(buttonVariants({ size, variant, style, disabled }), className)}
			{...rest}
		>
			{Icon && <Icon />}
			{text && <span>{text}</span>}
			{!text && !Icon ? <span>Button</span> : null}
		</button>
	);
}

Button.displayName = "Button";

export { Button, type ButtonProps };
