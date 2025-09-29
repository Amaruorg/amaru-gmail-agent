import { auth } from "@/domains/auth/client";
import type { User, SocialProvider, SessionData, ProviderToken } from "@/domains/auth/types";

export class AuthService {
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

	async getAccessToken(provider: SocialProvider, headers: Headers): Promise<ProviderToken> {
		try {
			const sessionData = await this.getSession(headers);
			if (!sessionData?.session || !sessionData.user) {
				throw new Error("Not authenticated - please sign in again");
			}
			const { user } = sessionData;
			const tokenResponse = await auth.api.getAccessToken({
				body: { providerId: provider, userId: user.id },
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

// Singleton instance
export const authService = new AuthService();
