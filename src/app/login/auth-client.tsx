"use client";

import { signInSocial} from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui";
import { Google } from "@/components/Icons";

export default function AuthClient() {
    const handleSignIn = async () => {
        await signInSocial("google");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-[var(--color-background)]">
            <div>
                <Button
                    text="Continue With Google"
                    icon={Google}
                    variant="outline"
                    size="md"
                    onClick={handleSignIn}
                />
            </div>
        </div>
    );
}