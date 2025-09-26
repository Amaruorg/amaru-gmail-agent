import { auth } from "@/lib/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionSummarize } from "@/components/dashboard/ActionSummarize";
import { getSummary } from "@/lib/actions/gmail";

export default async function DashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	const result = ""; // await getSummary();

	return (
		<>
			<h1 className="text-3xl">Hello there, {session.user.name.split(" ")[0]}!</h1>
			<h2 className="text-2xl text-gray-500">What&apos;s on your mind?</h2>
			<ActionSummarize summary={result} className="pt-8"></ActionSummarize>
		</>
	);
}
