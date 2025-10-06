"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type MultiLineMarqueeProps = {
	words: string[];
	color?: string;
};

export default function MultiLineMarquee({ words, color = "text-white" }: MultiLineMarqueeProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const directions = Array.from({ length: 21 }, () => (Math.random() > 0.5 ? "ltr" : "rtl"));

	const lines = Array.from({ length: 21 }, () => {
		// Significantly increase word count to fill gaps
		const count = Math.floor(Math.random() * 30) + 25;
		const chosen = Array.from({ length: count }, () => {
			const idx = Math.floor(Math.random() * words.length);
			return words[idx];
		});
		return chosen.join(" • ");
	});

	return (
		<div className="flex h-full flex-col gap-1 overflow-hidden bg-transparent p-2">
			{lines.map((text, i) => {
				const isLTR = directions[i] === "ltr";
				// Duplicate content multiple times to ensure no gaps
				const repeatedText = `${text} • ${text} • ${text} • ${text} • ${text}`;
				return (
					<div key={i} className="relative flex h-10 w-full items-center overflow-hidden">
						<motion.div
							className={`flex whitespace-nowrap ${color}`}
							style={{ 
								fontFamily: "'VT323', 'Press Start 2P', 'Courier New', monospace", 
								fontSize: "1.5rem", 
								fontWeight: "700",
								letterSpacing: "0.05em"
							}}
							initial={{ x: isLTR ? "0%" : "-50%" }}
							animate={{
								x: isLTR ? ["-50%", "0%"] : ["0%", "-50%"],
							}}
							transition={{
								repeat: Infinity,
								duration: 100,
								ease: "linear",
							}}
						>
							<span className="flex">{repeatedText}</span>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
}
