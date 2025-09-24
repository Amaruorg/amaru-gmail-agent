"use client";

import { motion } from "framer-motion";

type MultiLineMarqueeProps = {
	words: string[];
	color?: string;
};

export default function MultiLineMarquee({ words, color = "text-white" }: MultiLineMarqueeProps) {
	const directions = Array.from({ length: 21 }, () => (Math.random() > 0.5 ? "ltr" : "rtl"));

	const lines = Array.from({ length: 21 }, () => {
		const count = Math.floor(Math.random() * 15) + 3;
		const chosen = Array.from({ length: count }, () => {
			const idx = Math.floor(Math.random() * words.length);
			return words[idx];
		});
		return chosen.join(" ");
	});

	return (
		<div className="flex h-full flex-col gap-2 overflow-hidden bg-transparent p-4">
			{lines.map((text, i) => {
				const isLTR = directions[i] === "ltr";
				return (
					<div key={i} className="relative flex h-10 w-full items-center overflow-hidden">
						<motion.div
							className={`flex text-xl font-bold whitespace-nowrap ${color}`}
							animate={{
								x: isLTR ? ["-100%", "100%"] : ["100%", "-100%"],
							}}
							transition={{
								repeat: Infinity,
								duration: 45,
								ease: "linear",
							}}
						>
							<span className="mr-8 flex gap-8">{text}</span>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
}
