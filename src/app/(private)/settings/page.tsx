"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { motion, AnimatePresence } from "motion/react";
import { TabGroup, Button, Switch, Tag } from "@/components/ui";
import { Google } from "@/components/Icons";

const tabsContent = [
	{ href: "profile", label: "Profile" },
	{ href: "notifications", label: "Notifications" },
	{ href: "privacy", label: "Data and Privacy" },
];

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState("profile");
	const { user } = useUser();
	const handleTabChange = (id: string) => setActiveTab(id);

	return (
		<div className="flex h-screen flex-col overflow-hidden">
			{/* Header + Tabs */}
			<div className="bg-background sticky top-0 z-10 pb-6">
				<h1 className="mb-8 text-3xl">Settings</h1>
				<TabGroup tabs={tabsContent} basePath="/settings" onTabClick={handleTabChange} activeTab={activeTab} />
			</div>

			{/* Contenedor principal */}
			<div className="relative m-auto w-4/5 flex-1 p-10">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -15 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="absolute inset-0 overflow-auto"
					>
						{/* PROFILE */}
						{activeTab === "profile" && (
							<div className="bg-card-background mt-10 flex w-full flex-col gap-5 rounded-xl p-10">
								<div className="flex gap-5">
									<Image
										className="rounded-full"
										src={user?.image ?? ""}
										alt="Profile Picture"
										width={96}
										height={96}
									/>
									<div className="flex flex-col justify-center gap-2">
										<span className="text-xl">{user?.name}</span>
										<Tag text="Pro" className="border-primary bg-primary/20" variant={"outline"} />
									</div>
								</div>
								<div className="mx-10 mt-10 flex flex-col gap-5">
									<h2 className="text-lg">Active connections</h2>
									<div className="bg-background/50 flex gap-5 rounded-xl p-5">
										<div className="bg-foreground flex size-13 items-center justify-center rounded-full">
											<Google className="text-background" width={28} height={28} />
										</div>
										<div className="flex flex-1 flex-col justify-center">
											<span className="text-lg">Gmail</span>
											<span className="text-muted text-sm">{user?.email}</span>
										</div>
										<div className="flex items-center">
											<Button text="Remove" variant={"solid"} style={"danger"} size={"sm"} />
										</div>
									</div>
								</div>
							</div>
						)}

						{/* NOTIFICATIONS */}
						{activeTab === "notifications" && (
							<div className="bg-card-background mt-10 flex w-full flex-col gap-5 rounded-xl p-10">
								<div className="flex flex-col gap-5">
									<div className="flex">
										<div className="flex flex-1 flex-col gap-2">
											<span className="text-lg">Daily Summary</span>
											<span className="text-muted">Receive a summary of your day every morning.</span>
										</div>
										<div className="flex items-center">
											<Switch />
										</div>
									</div>
									<div className="flex">
										<div className="flex flex-1 flex-col gap-2">
											<span className="text-xl">Important Alerts</span>
											<span className="text-muted">Receive notifications about urgent events.</span>
										</div>
										<div className="flex items-center">
											<Switch />
										</div>
									</div>
								</div>
							</div>
						)}

						{/* PRIVACY */}
						{activeTab === "privacy" && (
							<div className="space-y-10">
								<div className="bg-card-background mt-10 flex w-full flex-col gap-5 rounded-xl p-10">
									<h3 className="text-xl">Manage data</h3>
									<div className="flex">
										<div className="flex flex-1 flex-col gap-2">
											<span className="text-lg">Export data</span>
											<span className="text-muted">
												Download a complete archive of all data linked to your account.
											</span>
										</div>
										<div className="flex items-end">
											<Button text="Export" size={"sm"} />
										</div>
									</div>
								</div>

								<div className="bg-status-alert/5 border-status-alert flex w-full flex-col gap-5 rounded-xl border-2 p-10">
									<h3 className="text-status-alert text-xl">Danger Zone</h3>
									<div className="flex">
										<div className="flex flex-1 flex-col gap-2">
											<span className="text-lg">Delete account</span>
											<span className="text-muted">
												This action is permanent and will delete all data associated with this account.
											</span>
											<div className="flex items-end">
												<Button text="Delete Account" style={"danger"} size={"sm"} variant={"outline"} />
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
