"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui";
import { Plus } from "@/components/Icons";
import { CreateCollectionModal, CollectionData } from "./CreateCollectionModal";
import { CollectionLayout } from "@/components/CollectionsComponents/CollectionsLayout";
import { type CollectionCardProps } from "@/components/CollectionsComponents/CollectionCard";
import { CollectionDetails } from "@/components/CollectionsComponents/CollectionDetails";

export default function CollectionsPage() {
	const [open, setOpen] = useState(false);
	const [collections, setCollections] = useState<CollectionCardProps[]>([]);
	const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

	const closeSidebar = () => setSelectedCollectionId(null);

	const handleSelectCollection = (id: string) => {
		// Cierra si se hace click en la misma tarjeta, o abre la nueva
		setSelectedCollectionId((prevId) => (prevId === id ? null : id));
	};

	const handleCreateCollection = (newCollectionData: CollectionData) => {
		const newCollection: CollectionCardProps = {
			title: newCollectionData.filterValue,
			description: `Collection based on ${newCollectionData.filter} "${newCollectionData.filterValue}" for the last ${newCollectionData.interval || "all"} days.`,
			id: Date.now().toString(),
			// La función onClick de la tarjeta ahora llama al manejador de la página
			onClick: handleSelectCollection,
		};

		setCollections((prevCollections) => [newCollection, ...prevCollections]); // Añade al inicio (reverse)
		setOpen(false);
	};

	// Obtiene el objeto de colección completo para el panel lateral
	const selectedCollection = useMemo(() => {
		return collections.find((c) => c.id === selectedCollectionId) || null;
	}, [collections, selectedCollectionId]);

	return (
		<div className="flex min-h-screen w-full">
			{/* Panel Principal de la Lista */}
			{/* Panel Principal de la Lista */}
			<div className="flex w-full flex-col p-6">
				{/* Encabezado */}
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-3xl">Collections</h1>
					<div className="flex rounded-md">
						{!selectedCollectionId && (
							<Button
								text="Create Collection"
								onClick={() => setOpen(true)}
								variant="solid"
								icon={Plus}
								left={false}
								size={"sm"}
							/>
						)}
					</div>
				</div>

				{/* Layout de Colecciones */}
				<CollectionLayout features={collections} onCardClick={handleSelectCollection} />
			</div>

			{/* Panel Lateral (Sidebar) */}
			<div
				className={`fixed inset-y-0 right-0 z-30 shadow-2xl bg-background transition-all duration-300 ${selectedCollectionId ? "border-muted w-full translate-x-0 border-l lg:w-full" : "w-0 translate-x-full"} lg:relative lg:translate-x-0`}
			>
				{selectedCollection && <CollectionDetails collection={selectedCollection} onClose={closeSidebar} />}
			</div>

			{/* Modal de Creación */}
			<CreateCollectionModal isOpen={open} onClose={() => setOpen(false)} onCreate={handleCreateCollection} />
		</div>
	);
}
