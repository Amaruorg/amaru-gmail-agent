"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Modal, Button, Input, Select, TextArea } from "@/components/ui";

const FilterOptions = [
	{ label: "Domain", value: "domain" },
	{ label: "Email", value: "email" },
];

const IntervalOptions = [
	{ label: "Last 5 days", value: "5" },
	{ label: "Last 7 days", value: "7" },
	{ label: "Last 10 days", value: "10" },
	{ label: "All", value: "" },
];

const collectionSchema = z.object({
	filter: z.enum(["domain", "email"]),
	filterValues: z.array(z.string()).min(1, "At least one value is required"),
	interval: z.string().min(1, "Interval is required"),
	prompt: z.string().optional(),
});

export type CollectionData = z.infer<typeof collectionSchema>;

const validateCollection = (data: {
	filter: "domain" | "email";
	filterValues: string[];
	interval: string;
	prompt?: string;
}) => {
	if (data.filter === "domain") {
		return collectionSchema
			.extend({
				filterValues: z
					.array(z.string().min(1).regex(/\.[a-z]{2,}$/, "Domain must include a valid TLD (e.g., .com)"))
					.min(1, "At least one domain is required"),
			})
			.safeParse(data);
	}

	if (data.filter === "email") {
		return collectionSchema
			.extend({
				filterValues: z
					.array(z.email("Invalid email format"))
					.min(1, "At least one email is required"),
			})
			.safeParse(data);
	}

	return collectionSchema.safeParse(data);
};

type CreateCollectionModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (data: CollectionData) => void;
};

export function CreateCollectionModal({ isOpen, onClose, onCreate }: CreateCollectionModalProps) {
	const [filter, setFilter] = useState<"domain" | "email">("domain");
	const [filterValues, setFilterValues] = useState<string[]>([]);
	const [currentInput, setCurrentInput] = useState("");
	const [interval, setInterval] = useState("");
	const [prompt, setPrompt] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleAddValue = () => {
		const trimmed = currentInput.trim();
		if (trimmed && !filterValues.includes(trimmed)) {
			setFilterValues([...filterValues, trimmed]);
			setCurrentInput("");
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.filterValues;
				return newErrors;
			});
		}
	};

	const handleRemoveValue = (value: string) => {
		setFilterValues(filterValues.filter((v) => v !== value));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddValue();
		}
	};

	const handleCreate = () => {
		const result = validateCollection({ filter, filterValues, interval, prompt });

		if (!result.success) {
			const newErrors: Record<string, string> = {};
			result.error.issues.forEach((err) => {
				if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
			});
			setErrors(newErrors);
			return;
		}

		setErrors({});
		onCreate(result.data);

		setFilterValues([]);
		setCurrentInput("");
		setInterval("");
		setPrompt("");
	};

	const handleClose = () => {
		setErrors({});
		setFilterValues([]);
		setCurrentInput("");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<div className="flex flex-col gap-4 p-10">
				{/* FILTER */}
				<p>Domain / Email</p>
				<div className="flex gap-2">
					<Select options={FilterOptions} value={filter} onChange={(val) => setFilter(val as "domain" | "email")} />
					<div className="flex w-full flex-col">
						<div className="flex flex-col gap-2">
							{/* Display added values as tags */}
							{filterValues.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{filterValues.map((value) => (
										<span
											key={value}
											className="bg-accent/20 text-accent flex items-center gap-1 rounded px-2 py-1 text-sm"
										>
											{value}
											<button
												onClick={() => handleRemoveValue(value)}
												className="hover:text-status-alert ml-1 text-xs"
											>
												×
											</button>
										</span>
									))}
								</div>
							)}
							{/* Input for new value */}
							<Input
								placeholder={`Add ${filter} and press Enter`}
								value={currentInput}
								onChange={(e) => setCurrentInput(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
						{errors.filterValues && <span className="text-status-alert mt-1 text-xs">{errors.filterValues}</span>}
					</div>
				</div>

				{/* INTERVAL */}
				<p>Interval</p>
				<div className="flex flex-col">
					<Select
						placeholder="Selecciona una opción"
						options={IntervalOptions}
						value={interval}
						onChange={setInterval}
					/>
					{errors.interval && <span className="text-status-alert mt-1 text-xs">{errors.interval}</span>}
				</div>

				{/* PROMPT */}
				<p>User Prompt (opcional)</p>
				<TextArea
					placeholder="E.g., Find me all emails related to project X"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>

				{/* BUTTONS */}
				<div className="mt-4 flex justify-end gap-2">
					<Button
						text="Create"
						onClick={handleCreate}
						size={"sm"}
						className="bg-status-success/40 hover:bg-status-success/50"
					/>
					<Button
						text="Cancel"
						onClick={handleClose}
						size={"sm"}
						className="bg-status-alert/40 hover:bg-status-alert/50"
					/>
				</div>
			</div>
		</Modal>
	);
}
