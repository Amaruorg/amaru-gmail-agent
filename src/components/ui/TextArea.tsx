"use client";
import React, { TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils/tailwind";

const textareaVariants = cva("flex items-center", {
	variants: {
		variant: {
			solid: "bg-input-background",
			outline: "bg-transparent border-2 border-primary",
		},
	},
	defaultVariants: {
		variant: "solid",
	},
});

type TextAreaVariants = VariantProps<typeof textareaVariants>;
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaVariants;

/**
 * Variants:
 * - variant: solid | outline
 *
 * Props:
 * - Inherits all native <textarea> props.
 */
function TextArea({ variant = "solid", className = "", ...rest }: TextAreaProps) {
	return (
		<div
			className={mergeClasses(
				textareaVariants({ variant }),
				"border-input-border w-full rounded-md border px-4 py-2 shadow-sm",
			)}
		>
			<textarea
				className={mergeClasses(
					"text-foreground placeholder:text-muted w-full resize-none bg-transparent outline-none",
					className,
				)}
				rows={4}
				{...rest}
			/>
		</div>
	);
}

TextArea.displayName = "TextArea";

export { TextArea, type TextAreaProps };
