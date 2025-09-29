"use server";

import { auth } from "@/domains/auth/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SocialProvider } from "@/domains/auth/types";
import { authShared } from "@/lib/config";

async function signInSocialInternal(provider: SocialProvider, callbackUrl?: string): Promise<string> {
	const { url } = await auth.api.signInSocial({
		body: {
			provider,
			callbackURL: callbackUrl || authShared.callbackUrl,
		},
	});

	if (!url) {
		throw new Error("Failed to generate sign-in URL");
	}

	return url;
}

async function signOutInternal(): Promise<void> {
	await auth.api.signOut({ headers: await headers() });
}

export const signInSocial = async (provider: SocialProvider) => {
	let url: string | undefined;
	try {
		url = await signInSocialInternal(provider);
	} catch (error) {
		console.error("Error during social sign-in:", error);
	}

	if (url) {
		redirect(url);
	}
};

export const signOut = async () => {
	console.log("HIT sing");
	try {
		await signOutInternal();
	} catch (error) {
		console.error("Error during sign-out:", error);
	}
	redirect("/");
};
