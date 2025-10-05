import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/shared/db/prisma";
import { authShared } from "@/lib/config";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60, // 1 hour
		},
	},
	socialProviders: {
		google: {
			clientId: authShared.clientId,
			clientSecret: authShared.clientSecret,
			scope: authShared.scope,
			accessType: "offline",
			prompt: "select_account consent",
		},
	},
	plugins: [nextCookies()],
});
