"use client";
import React, { TextareaHTMLAttributes, useRef, useEffect } from "react";
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
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & 
	TextAreaVariants & {
		autoResize?: boolean;
	};

/**
 * Variants:
 * - variant: solid | outline
 *
 * Props:
 * - Inherits all native <textarea> props.
 * - autoResize: Enable automatic height adjustment based on content
 */
function TextArea({ variant = "solid", className = "", autoResize = false, ...rest }: TextAreaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (autoResize && textareaRef.current) {
			const adjustHeight = () => {
				const textarea = textareaRef.current;
				if (textarea) {
					textarea.style.height = "auto";
					textarea.style.height = `${textarea.scrollHeight}px`;
				}
			};

			adjustHeight();
			
			const textarea = textareaRef.current;
			textarea.addEventListener("input", adjustHeight);
			
			return () => {
				textarea.removeEventListener("input", adjustHeight);
			};
		}
	}, [autoResize, rest.value]);

	return (
		<div
			className={mergeClasses(
				textareaVariants({ variant }),
				"border-input-border w-full rounded-md border px-4 py-2 shadow-sm",
			)}
		>
			<textarea
				ref={textareaRef}
				className={mergeClasses(
					"text-foreground placeholder:text-muted w-full bg-transparent outline-none",
					autoResize ? "resize-none overflow-hidden" : "resize-y",
					className,
				)}
				rows={autoResize ? 1 : 4}
				{...rest}
			/>
		</div>
	);
}

TextArea.displayName = "TextArea";

export { TextArea, type TextAreaProps };
