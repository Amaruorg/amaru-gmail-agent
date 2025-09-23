import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";

export default async function DataPrivacyPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	return (
		<div className="flex flex-col gap-10">
			<div className="bg-card-background flex w-full flex-col gap-5 rounded-xl p-10">
				<h2 className="text-xl">Manage data</h2>
				<div className="flex">
					<div className="flex flex-1 flex-col gap-2">
						<span className="text-lg">Export data</span>
						<span className="text-muted">Download a complete archive of all data linked to your account.</span>
					</div>
					<div className="flex items-center">
						<Button text="Export" />
					</div>
				</div>
			</div>
			<div className="bg-status-alert/10 border-status-alert flex w-full flex-col gap-5 rounded-xl border-2 p-10">
				<h2 className="text-status-alert text-xl">Danger Zone</h2>
				<div className="flex">
					<div className="flex flex-1 flex-col gap-2">
						<span className="text-lg">Delete account</span>
						<span className="text-muted">
							This action is permanent and will delete all data associated with this account.
						</span>
					</div>
					<div className="flex items-center">
						<Button text="Delete Account" style={"danger"} />
					</div>
				</div>
			</div>
		</div>
	);
}
