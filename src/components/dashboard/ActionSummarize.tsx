import React from "react";

type ActionSummarizeProps = {
	summary: string;
	className?: string;
};

function ActionSummarize({ summary, className }: ActionSummarizeProps) {
	return (
		<div className={`${className}`}>
			<div>
				<span className="text-2xl">
					Ready to level up?
					<br />
					Choose an action and type your prompt to ease your pain.
				</span>
			</div>
			<div className="mt-5 flex h-12 w-1/2 overflow-hidden rounded-lg border border-neutral-800">
				<select name="Actions" className="cursor-pointer border-r border-neutral-900 bg-neutral-900 px-3 outline-none">
					<option value="summarize">Summarize</option>
				</select>
				<input placeholder="Custom prompt..." className="flex-1 px-3 outline-none" />
				<button className="bg-primary hover:bg-primary/80 active:bg-primary/70 cursor-pointer px-4 py-2 pr-10 pl-10 text-white">
					Run
				</button>
			</div>
			<div className="mt-5 h-1/2 w-1/2 rounded-lg bg-neutral-900 p-5">
				<span>{summary}asdas</span>
			</div>
		</div>
	);
}

export { ActionSummarize };
