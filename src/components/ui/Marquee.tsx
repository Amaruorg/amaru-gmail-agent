"use client";

import React from "react";

type MarqueeProps = {
	items?: string[];
};

function Marquee({ items }: MarqueeProps) {
	return (
		<div className="marquee-container bg-primary text-background relative w-full overflow-hidden">
			<div className="marquee justify-content-around flex gap-8 overflow-hidden">
				{items?.map((item, index) => (
					<React.Fragment key={index}>
						<span>{item}</span>
						<span>-</span>
					</React.Fragment>
				))}
			</div>
			<div className="marquee marquee2 justify-content-around flex gap-8 overflow-hidden">
				{items?.map((item, index) => (
					<React.Fragment key={index}>
						<span>{item}</span>
						<span>-</span>
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export { Marquee };
