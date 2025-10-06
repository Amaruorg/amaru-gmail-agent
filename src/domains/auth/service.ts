import { auth } from "@/domains/auth/client";
import { authConfig } from "@/lib/config";
import type { User, SocialProvider, SessionData, ProviderToken } from "@/domains/auth/types";

export class AuthService {
	async signInSocial(provider: SocialProvider, callbackURL?: string): Promise<string> {
		try {
			const { url } = await auth.api.signInSocial({
				body: {
					provider,
					callbackURL: callbackURL || authConfig.callbackUrl,
				},
			});

			if (!url) {
				throw new Error(`Failed to generate sign-in URL`);
			}
			return url;
		} catch (error) {
			throw error;
		}
	}

	async signOut(headers: Headers): Promise<void> {
		try {
			await auth.api.signOut({ headers });
		} catch (error) {
			throw error;
		}
	}

	async getSession(headers: Headers): Promise<SessionData | null> {
		try {
			const res = await auth.api.getSession({ headers });

			if (!res?.session || !res.user) {
				return null;
			}

			return {
				session: res.session,
				user: res.user as User,
			};
		} catch (error) {
			throw error;
		}
	}

	async getAccessToken(headers: Headers): Promise<ProviderToken> {
		try {
			const sessionData = await this.getSession(headers);
			if (!sessionData?.session || !sessionData.user) {
				throw new Error("Not authenticated - please sign in again");
			}
			const { user } = sessionData;
			const tokenResponse = await auth.api.getAccessToken({
				body: { providerId: "google", userId: user.id },
			});

			if (!tokenResponse?.accessToken) {
				throw new Error("Failed to retrieve access token - please re-authenticate");
			}

			return {
				accessToken: tokenResponse.accessToken,
			};
		} catch (error) {
			throw error;
		}
	}
}

export const authService = new AuthService();
