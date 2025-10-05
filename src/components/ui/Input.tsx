import React from "react";
import { InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils/tailwind";
import { Button, type ButtonProps } from "@/components/ui";
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
	} & {
		SearchButton?: boolean;
	};

/**
 * Variants:
 * - variant: solid | outline
 * - buttonVariant?: forwarded to inner <Button>
 *
 * Props:
 * - Inherits all native <input> props.
 */
function Input({ variant = "solid", buttonVariant = "solid", SearchButton = false, ...rest }: InputProps) {
	return (
		<div className="flex w-full">
			<div
				className={mergeClasses(
					inputVariants({ variant }),
					`${SearchButton ? "rounded-l-md" : "rounded-md py-2"} border-input-border w-full flex-1 border px-4 shadow-sm`,
				)}
			>
				<input
					type="text"
					className="text-foreground placeholder:text-muted w-full appearance-none border-none outline-none focus:border-transparent focus:shadow-none focus:ring-0 focus:outline-none"
					{...rest}
				/>
			</div>
			{SearchButton && (
				<div className={mergeClasses(inputVariants({ buttonVariant }), "rounded-r-xl")}>
					<Button icon={Search} variant={buttonVariant} size="sm" className="m-0 rounded-l-none rounded-r-xl" />
				</div>
			)}
		</div>
	);
}

Input.displayName = "Input";

export { Input, type InputProps };
