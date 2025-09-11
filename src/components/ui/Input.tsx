import React from "react";
import { InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Search } from "@/components/icons/Search";

const inputVariants = cva("flex items-center", {
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

const bgMap = {
	solid: "bg-input-background",
	outline: "bg-transparent",
};

type InputVariants = VariantProps<typeof inputVariants>;
type InputProps = InputHTMLAttributes<HTMLInputElement> &
	InputVariants & {
		buttonVariant?: ButtonProps["variant"];
	};

export default function Input({ variant, buttonVariant, ...props }: InputProps) {
	const background = variant ? bgMap[variant] : bgMap.solid;
	return (
		<div className="flex w-full">
			<div className={mergeClasses(inputVariants({ variant }), "px-4 flex-1 rounded-l-xl w-full")}>
				<input
					type="text"
					className="bg-transparent outline-none text-foreground placeholder:text-muted w-full"
					{...props}
				/>
			</div>
			<div className={mergeClasses(background, "rounded-r-xl")}>
				<Button variant={buttonVariant} size="sm" className="rounded-r-xl rounded-l-none m-0">
					<Search className="text-white" />
				</Button>
			</div>
		</div>
	);
}
