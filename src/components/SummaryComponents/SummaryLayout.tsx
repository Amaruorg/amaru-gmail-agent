import { SummaryCard, type SummaryCardProps } from "./SummaryCard";

interface SummaryViewProps {
	events: SummaryCardProps[];
}

function SummaryLayout({ events }: SummaryViewProps) {
	return (
		<section className="px-4 py-16">
			<div className="max-full relative">
				<div className="bg-muted/50 absolute top-0 left-0 hidden h-full w-0.25 md:block"></div>

				{events.map((event, index) => (
					<div key={index} className="relative mb-12 flex w-full items-start">
						<div className="absolute top-0 left-0 z-10 -translate-x-1/2 transform">
							<div className="border-accent-blue bg-accent-blue/80 h-4 w-4 rounded-full border-2"></div>
						</div>
						<div className="w-full pl-6">
							<SummaryCard {...event} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export { SummaryLayout, type SummaryViewProps };
