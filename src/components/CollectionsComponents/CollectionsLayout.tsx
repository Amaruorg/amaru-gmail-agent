import { CollectionCard, type CollectionCardProps } from "./CollectionCard";

interface CollectionLayoutProps {
	features: CollectionCardProps[];
	onCardClick: (id: string) => void;
}

function CollectionLayout({ features, onCardClick }: CollectionLayoutProps) {
	return (
		<div
			className="mt-10 grid gap-6 transition-all duration-300"
			style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
		>
			{features.map((feature) => (
				<CollectionCard
					key={feature.id}
					id={feature.id}
					title={feature.title}
					description={feature.description}
					onClick={() => onCardClick(feature.id)}
				/>
			))}
		</div>
	);
}

export { CollectionLayout, type CollectionLayoutProps };
