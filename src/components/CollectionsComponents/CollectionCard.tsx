type CollectionCardProps = {
	id: string;
	title: string;
	description: string;
	onClick: (id: string) => void;
};

function CollectionCard({ id, title, description, onClick }: CollectionCardProps) {
	const handleClick = () => {
		onClick(id);
	};

	return (
		<div
			className="bg-card-background/80 hover:bg-card-background h-full cursor-pointer rounded-xl p-6 shadow-xl transition-transform duration-200 hover:scale-[1.02]"
			onClick={handleClick}
		>
			<h3 className="text-foreground mb-2 text-xl">{title}</h3>
			<p className="text-muted">{description}</p>
		</div>
	);
}

export { CollectionCard, type CollectionCardProps };
