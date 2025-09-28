import { z } from "zod";

const envSchema = z.object({
	GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
	GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
	BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
	BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required").optional(),
	DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL").optional(),
	NEXT_PUBLIC_BASE_URL: z.string().url("NEXT_PUBLIC_BASE_URL must be a valid URL").optional(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// validate and parse environment variables at startup time to fail fast if misconfigured
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
			throw new Error(`Environment validation failed:\n${errorMessage}`);
		}
		throw error;
	}
};

export const config = parseEnv();

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test";

// Auth configuration to be used in better-auth and auth clients
export const authConfig = {
	google: {
		clientId: config.GOOGLE_CLIENT_ID,
		clientSecret: config.GOOGLE_CLIENT_SECRET,
		scopes: ["openid", "profile", "email", "https://www.googleapis.com/auth/gmail.readonly"] as string[],
	},
	callbackUrl: `${config.BETTER_AUTH_URL}/dashboard`,
	baseUrl: config.BETTER_AUTH_URL,
} as const;

// API configuration to be used in clients
export const apiConfig = {
	baseUrl: config.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
	endpoints: {
		gemini: "/api/gemini",
	},
} as const;
