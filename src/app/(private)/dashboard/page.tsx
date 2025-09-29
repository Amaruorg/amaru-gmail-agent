import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionSummarize } from "@/components/dashboard/ActionSummarize";

export default async function DashboardPage() {
	const headersList = await headers();
	const session = await authService.getSession(headersList);

	if (!session) {
		redirect("/");
	}

	const result = ""; // await getSummary();
	const userName = session.user.name ?? "Unknown";

	return (
		<>
			<h1 className="text-3xl">Hello there, {userName.split(" ")[0]}!</h1>
			<h2 className="text-2xl text-gray-500">What&apos;s on your mind?</h2>
			<ActionSummarize summary={result} className="pt-8"></ActionSummarize>
		</>
	);
}
