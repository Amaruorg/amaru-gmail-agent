"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui";
import { Plus } from "@/components/Icons";
import { CreateCollectionModal, CollectionData } from "./CreateCollectionModal";
import { CollectionLayout } from "@/components/CollectionsComponents/CollectionsLayout";
import { type CollectionCardProps } from "@/components/CollectionsComponents/CollectionCard";
import { CollectionDetails } from "@/components/CollectionsComponents/CollectionDetails";
import { getCollectionAnalysis } from "@/domains/ai/actions";
import type { ActionCollection } from "@/domains/gmail/types";

type CollectionWithData = CollectionCardProps & {
	filterData: CollectionData;
	actions?: ActionCollection;
	isLoading?: boolean;
};

export default function CollectionsPage() {
	const [open, setOpen] = useState(false);
	const [collections, setCollections] = useState<CollectionWithData[]>([]);
	const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

	const closeSidebar = () => setSelectedCollectionId(null);

	const handleSelectCollection = (id: string) => {
		// Cierra si se hace click en la misma tarjeta, o abre la nueva
		setSelectedCollectionId((prevId) => (prevId === id ? null : id));
	};

	useEffect(() => {
		const savedCollections = localStorage.getItem("collections");
		if (savedCollections) {
			try {
				const parsed = JSON.parse(savedCollections);
				const restored = parsed.map((c: CollectionWithData) => ({
					...c,
					onClick: handleSelectCollection,
				}));
				setCollections(restored);
			} catch (error) {
				console.error("Error loading saved collections:", error);
			}
		}
	}, []);

	useEffect(() => {
		if (collections.length > 0) {
			const toSave = collections.map(({ onClick, ...rest }) => rest);
			localStorage.setItem("collections", JSON.stringify(toSave));
		}
	}, [collections]);

	const handleRunCollection = async (id: string) => {
		const collection = collections.find((c) => c.id === id);
		if (!collection || collection.isLoading) return;

		setCollections((prev) =>
			prev.map((c) => (c.id === id ? { ...c, isLoading: true } : c))
		);

		try {
			const actions = await getCollectionAnalysis(
				{
					filterType: collection.filterData.filter,
					filterValues: collection.filterData.filterValues,
					interval: collection.filterData.interval,
				},
				collection.filterData.prompt
			);

			setCollections((prev) =>
				prev.map((c) =>
					c.id === id ? { ...c, actions, isLoading: false } : c
				)
			);

		} catch (error) {
			console.error("Error running collection analysis:", error);
			setCollections((prev) =>
				prev.map((c) => (c.id === id ? { ...c, isLoading: false } : c))
			);
		}
	};

	const handleDeleteCollection = (id: string) => {
		setCollections((prev) => prev.filter((c) => c.id !== id));
		// Close the sidebar if the deleted collection was selected
		if (selectedCollectionId === id) {
			setSelectedCollectionId(null);
		}
	};

	const handleCreateCollection = (newCollectionData: CollectionData) => {
		const displayValues = newCollectionData.filterValues.join(", ");
		const truncatedDisplay =
			displayValues.length > 40
				? displayValues.substring(0, 40) + "..."
				: displayValues;

		const newCollection: CollectionWithData = {
			title: truncatedDisplay,
			description: `Collection based on ${newCollectionData.filter} for the last ${newCollectionData.interval || "all"} days.`,
			id: Date.now().toString(),
			onClick: handleSelectCollection,
			filterData: newCollectionData,
		};

		setCollections((prevCollections) => [newCollection, ...prevCollections]);
		setOpen(false);
	};

	// Obtiene el objeto de colección completo para el panel lateral
	const selectedCollection = useMemo(() => {
		return collections.find((c) => c.id === selectedCollectionId) || null;
	}, [collections, selectedCollectionId]);

	return (
		<div className="flex min-h-screen w-full">
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
				{selectedCollection && (
					<CollectionDetails
						collection={selectedCollection}
						onClose={closeSidebar}
						onRun={handleRunCollection}
						onDelete={handleDeleteCollection}
					/>
				)}
			</div>

			{/* Modal de Creación */}
			<CreateCollectionModal isOpen={open} onClose={() => setOpen(false)} onCreate={handleCreateCollection} />
		</div>
	);
}
