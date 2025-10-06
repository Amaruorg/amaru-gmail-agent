import React from "react";

type MarqueeProps = {
	items?: string[];
};

function Marquee({ items }: MarqueeProps) {
	const multipleItems = items ? [...items, ...items, ...items, ...items] : [];
	
	return (
		<div 
			className="bg-primary text-background relative w-full overflow-hidden"
			style={{ height: "36px" }}
		>
			<div 
				className="absolute left-0 top-0 flex h-full items-center gap-4 whitespace-nowrap animate-marquee"
				style={{ 
					fontFamily: "'VT323', 'Press Start 2P', 'Courier New', monospace",
					fontSize: "1.5rem",
					fontWeight: "400",
					letterSpacing: "0.05em"
				}}
			>
				{multipleItems?.map((item, index) => (
					<React.Fragment key={index}>
						<span>{item}</span>
						{index < multipleItems.length - 1 && <span>•</span>}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export { Marquee };
