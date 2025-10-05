"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUp } from "../Icons";

type Option = { label: string; value: string };

type SelectProps = {
	options: Option[];
	placeholder?: string;
	onChange?: (value: string) => void;
	value?: string;
};

export function Select({ options, placeholder, onChange, value }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<Option | null>(null);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!placeholder && options.length > 0) {
			setSelected(value ? options.find((opt) => opt.value === value) || null : options[0]);
			onChange?.(value || options[0].value);
		}
	}, [placeholder, options, onChange, value]);

	const handleSelect = (opt: Option) => {
		setSelected(opt);
		setIsOpen(false);
		onChange?.(opt.value);
	};

	return (
		<div ref={selectRef} className="relative w-full">
			<button
				type="button"
				onClick={() => setIsOpen((p) => !p)}
				className="border-input-border bg-input-background text-foreground flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm shadow-sm"
			>
				<span className="text-foreground">{selected?.label || placeholder || ""}</span>
				{isOpen ? <ArrowUp className="text-muted h-4 w-4" /> : <ArrowDown className="text-muted h-4 w-4" />}
			</button>

			{isOpen && (
				<ul className="border-input-border bg-input-background absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border shadow-lg">
					{options.map((opt) => (
						<li
							key={opt.value}
							onClick={() => handleSelect(opt)}
							className={`hover:bg-accent-blue/10 text-foreground cursor-pointer px-3 py-2 text-sm ${
								selected?.value === opt.value ? "bg-accent-blue/20" : ""
							}`}
						>
							{opt.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
