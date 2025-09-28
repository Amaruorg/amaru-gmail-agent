export interface User {
	id: string;
	email: string;
	name?: string | undefined;
	image?: string | undefined;
}

export interface Session {
	id: string;
	userId: string;
	expiresAt: Date;
}

export interface ProviderToken {
	accessToken: string;
	refreshToken?: string;
	expiresAt?: Date;
}

export interface SessionData {
	session: Session;
	user: User;
}

export type SocialProvider = "google";

export interface SignInParams {
	provider: SocialProvider;
	callbackUrl?: string;
}
