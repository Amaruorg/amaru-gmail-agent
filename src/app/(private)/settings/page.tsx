import { auth } from "@/lib/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingIndexPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}
	redirect("settings/profile");
}
