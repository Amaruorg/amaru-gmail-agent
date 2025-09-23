import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Switch } from "@/components/ui";

export default async function NotificationsPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	return (
		<div className="flex flex-col">
			<div className="bg-card-background flex w-full flex-col gap-10 rounded-xl p-10">
				<h2 className="text-lg">Email notifications</h2>
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
		</div>
	);
}
