import { betterAuth } from "better-auth";
import { authConfig } from "@/lib/config";

export const auth = betterAuth(authConfig);
