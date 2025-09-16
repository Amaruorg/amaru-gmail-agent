import React from "react";
import { InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";
import { Button, type ButtonProps } from "@/components/ui/";
import { Search } from "@/components/Icons";

const inputVariants = cva("flex items-center", {
	variants: {
		variant: {
			solid: "bg-input-background",
			outline: "bg-transparent border-2 border-primary",
		},
		buttonVariant: {
			solid: "bg-input-background",
			outline: "bg-transparent",
		},
	},
	defaultVariants: {
		variant: "solid",
		buttonVariant: "solid",
	},
});

type InputVariants = VariantProps<typeof inputVariants>;
type InputProps = InputHTMLAttributes<HTMLInputElement> &
	InputVariants & {
		buttonVariant?: ButtonProps["variant"];
	};

/**
 * Variants:
 * - variant: solid | outline
 * - buttonVariant?: forwarded to inner <Button>
 *
 * Props:
 * - Inherits all native <input> props.
 */
function Input({ variant = "solid", buttonVariant = "solid", ...props }: InputProps) {
	return (
		<div className="flex w-full">
			<div className={mergeClasses(inputVariants({ variant }), "px-4 flex-1 rounded-l-xl w-full")}>
				<input
					type="text"
					className="bg-transparent outline-none text-foreground placeholder:text-muted w-full"
					{...props}
				/>
			</div>
			<div className={mergeClasses(inputVariants({ buttonVariant }), "rounded-r-xl")}>
				<Button
					icon={Search}
					variant={buttonVariant}
					size="sm"
					className="rounded-r-xl rounded-l-none m-0"
				/>
			</div>
		</div>
	);
}

Input.displayName = "Input";

export { Input, type InputProps };