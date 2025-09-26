import { redirect } from "next/navigation";

export default async function SettingIndexPage() {
	redirect("/settings/profile");
}
