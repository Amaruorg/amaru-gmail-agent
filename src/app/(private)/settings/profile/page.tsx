import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button, Tag } from "@/components/ui";
import { Google } from "@/components/Icons";

export default async function ProfilePage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	return (
		<div className="flex flex-col gap-10">
			<div className="bg-card-background flex w-full flex-col gap-5 rounded-xl p-10">
				<h2 className="text-lg">Profile</h2>
				<div className="flex gap-5">
					<Image className="rounded-full" src={session.user.image ?? ""} alt="Profile Picture" width={96} height={96} />
					<div className="flex flex-col justify-center gap-2">
						<span className="text-xl">{session.user.name}</span>
						<Tag text="Pro" className="border-primary bg-primary/20" variant={"outline"} />
					</div>
				</div>
			</div>
			<div className="bg-card-background flex w-full flex-col gap-5 rounded-xl p-10">
				<h2 className="text-lg">Active connections</h2>
				<div className="bg-background/50 flex gap-5 rounded-xl p-5">
					<div className="bg-foreground flex h-16 w-16 items-center justify-center rounded-full">
						<Google className="text-background" width={50} height={50} />
					</div>
					<div className="flex flex-1 flex-col justify-center">
						<span className="text-xl">Gmail</span>
						<span className="text-muted text-xl">JohnDoe@gmail.com</span>
					</div>
					<div className="flex items-center">
						<Button text="Remove" variant={"solid"} style={"danger"} />
					</div>
				</div>
			</div>
		</div>
	);
}
