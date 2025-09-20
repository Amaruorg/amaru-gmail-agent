import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogOutButton from "./LogOutButton";

export default async function DashboardPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[var(--color-background)]">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Welcome to the Dashboard {session.user.name}</h1>
            <LogOutButton />
        </div>
    );
}