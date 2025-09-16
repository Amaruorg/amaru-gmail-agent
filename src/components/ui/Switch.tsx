// components/ui/switch.tsx
import { useState, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/tailwindUtils";

const switchVariants = cva(
	"relative inline-flex h-6 w-12 rounded-full transition-colors border-2 items-center focus:outline-none disabled:cursor-not-allowed",
	{
		variants: {
			state: {
				checked: "bg-primary border-switch-thumb",
				unchecked: "bg-muted border-switch-thumb",
				disabled: "bg-muted border-switch-thumb opacity-60 cursor-not-allowed",
			},
		},
		defaultVariants: {
			state: "unchecked",
		},
	},
);

type switchVariants = VariantProps<typeof switchVariants>;

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> &
	switchVariants & {
		ref?: React.Ref<HTMLButtonElement>;
		checked?: boolean;
		onChange?: (checked: boolean) => void;
	};

function Switch({ className, ref, checked = false, disabled, onChange, ...props }: SwitchProps) {
	const [internalChecked, setInternalChecked] = useState(checked);

	const state = disabled ? "disabled" : internalChecked ? "checked" : "unchecked";

	const toggle = () => {
		if (disabled) return;
		else {
			setInternalChecked(!internalChecked);
			onChange?.(!internalChecked);
		}
	};

	return (
		<button
			ref={ref}
			role="switch"
			aria-checked={internalChecked}
			disabled={disabled}
			onClick={toggle}
			className={mergeClasses(switchVariants({ state }), className)}
			{...props}
		>
			<motion.span
				layout
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
				className={mergeClasses(
					"pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 ml-0.5 bg-switch-thumb",
					internalChecked ? "translate-x-6" : "translate-x-0",
				)}
			/>
		</button>
	);
}

Switch.displayName = "Switch";

export { Switch, type SwitchProps };
