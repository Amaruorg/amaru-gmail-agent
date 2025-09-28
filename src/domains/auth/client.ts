import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/shared/db/prisma";
import { authConfig } from "@/lib/config";

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
			clientId: authConfig.google.clientId,
			clientSecret: authConfig.google.clientSecret,
			scope: authConfig.google.scopes,
			accessType: "offline",
			prompt: "consent",
			approvalPrompt: "force",
		},
	},
	plugins: [nextCookies()],
});
