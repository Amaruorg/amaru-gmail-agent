import { auth } from "@/lib/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function WhitelistPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<h1 className="text-3xl">Whitelist</h1>
		</>
	);
}
