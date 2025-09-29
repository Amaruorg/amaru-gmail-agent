import { z } from "zod";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/shared/db/prisma";
import type { BetterAuthOptions } from "better-auth";

const envSchema = z.object({
	OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
	GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
	GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
	BETTER_AUTH_URL: z.url("BETTER_AUTH_URL must be a valid URL"),
	BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
	REDIRECT_URL: z.url("REDIRECT_URL must be a valid URL"),
	DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),
	NEXT_PUBLIC_BASE_URL: z.url("NEXT_PUBLIC_BASE_URL must be a valid URL").optional(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Validate and parse environment variables at startup time to fail fast if misconfigured
const parseEnv = () => {
	try {
		return envSchema.parse(process.env);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessage = error.issues
				.map((issue) => {
					const path = issue.path.length ? issue.path.join(".") : "root";
					return `${path}: ${issue.message}`;
				})
				.join("\n");
			throw new Error(`Environment variables validation failed:\n${errorMessage}`);
		}
		throw error;
	}
};

export const config = {
	...parseEnv(),
	GOOGLE_SCOPE: ["profile", "https://www.googleapis.com/auth/gmail.readonly"] as string[],
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test";

// Auth fields that are shared
export const authShared = {
	clientId: config.GOOGLE_CLIENT_ID,
	clientSecret: config.GOOGLE_CLIENT_SECRET,
	callbackUrl: `${config.BETTER_AUTH_URL}/dashboard`,
	authUrl: config.BETTER_AUTH_URL,
	redirectUrl: config.REDIRECT_URL,
	scope: config.GOOGLE_SCOPE,
};

export const authConfig: BetterAuthOptions = {
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
};

export const apiConfig = {
	baseUrl: config.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
	endpoints: {
		openrouter: "/api/openrouter",
	},
} as const;
