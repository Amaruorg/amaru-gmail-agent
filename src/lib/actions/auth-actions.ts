"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInSocial = async (provider: "google") => {
    console.log("signInSocial called with provider:", provider);
    const { url } = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: `${process.env.BETTER_AUTH_URL}/dashboard`,
        },
    });

    if (url) {
        redirect(url);
    }
};

export const signOut = async () => {
    const result = await auth.api.signOut({ headers: await headers() });
    return result
}

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    return session;
}