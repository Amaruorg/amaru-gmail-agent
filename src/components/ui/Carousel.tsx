"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselProps = {
	slides: {
		src: string;
		alt: string;
		title: string;
		description: string;
	}[];
	autoPlay?: boolean;
	interval?: number; // milisegundos
};

function Carousel({ slides, autoPlay = true, interval = 5000 }: CarouselProps) {
	const [current, setCurrent] = useState(0);
	const length = slides.length;

	useEffect(() => {
		if (!autoPlay) return;
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % length);
		}, interval);
		return () => clearInterval(timer);
	}, [autoPlay, interval, length]);

	return (
		<section className="flex flex-col items-center justify-center pb-60 text-white">
			<div className="max-w-14xl relative w-full overflow-hidden">
				<div
					className="flex transition-transform duration-700 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{slides.map((slide, index) => (
						<div key={index} className="flex w-full flex-shrink-0 items-center gap-8 px-4">
							<div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-[#1988b0] to-[#0a4a6a] p-0.5">
								<Image
									src={slide.src}
									alt={slide.alt}
									width={800}
									height={500}
									className="rounded-lg border border-gray-700 shadow-2xl"
								/>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h2 className="mb-4 text-2xl font-bold text-white">{slide.title}</h2>
								<p className="text-lg text-gray-300">{slide.description}</p>
							</div>
						</div>
					))}
				</div>

				{/* Indicadores inferiores */}
				<div className="left-1/2 mt-10 flex justify-center gap-3">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrent(index)}
							className={`h-1 w-8 transition ${index === current ? "bg-white" : "bg-gray-500"}`}
						></button>
					))}
				</div>
			</div>
		</section>
	);
}

export { Carousel, type CarouselProps };
