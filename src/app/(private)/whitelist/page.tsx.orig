import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function WhitelistPage() {
	const session = await authService.getSession(await headers());

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<h1 className="text-3xl">Whitelist</h1>
		</>
	);
}
