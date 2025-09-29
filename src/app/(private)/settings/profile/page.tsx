import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";
import { Google } from "@/components/Icons";

export default async function ProfilePage() {
	const headersList = await headers();
	const session = await authService.getSession(headersList);

	if (!session) {
		redirect("/");
	}

	return (
		<>
			<div className="bg-card-background flex w-full flex-col gap-5 rounded-xl p-10">
				<h2 className="text-lg">Active connections</h2>
				<div className="bg-background/50 flex gap-5 rounded-xl p-5">
					<div className="bg-foreground flex size-13 items-center justify-center rounded-full">
						<Google className="text-background" width={28} height={28} />
					</div>
					<div className="flex flex-1 flex-col justify-center">
						<span className="text-lg">Gmail</span>
						<span className="text-muted text-sm">{session.user.email}</span>
					</div>
					<div className="flex items-center">
						<Button text="Remove" variant={"solid"} style={"danger"} size={"sm"} />
					</div>
				</div>
			</div>
		</>
	);
}
