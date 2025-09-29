"use server";

import { authService } from "@/domains/auth/service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SocialProvider } from "@/domains/auth/types";

export const signInSocial = async (provider: SocialProvider) => {
	let url: string | undefined;
	try {
		url = await authService.signInSocial(provider);
	} catch (error) {
		console.error("Error during social sign-in:", error);
	}
	if (url) {
		redirect(url);
	}
};

export const signOut = async () => {
	try {
		const headersList = await headers();
		await authService.signOut(headersList);
		redirect("/");
	} catch (error) {
		console.error("Error during sign-out:", error);
	}
};
