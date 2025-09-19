"use client";

import { signOut } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui";
import { Google } from "@/components/Icons";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[var(--color-background)]">
            <div>
                <Button
                    text="Sign Out"
                    icon={Google}
                    variant="outline"
                    size="md"
                    onClick={handleSignOut}
                />
            </div>
        </div>
    )
}