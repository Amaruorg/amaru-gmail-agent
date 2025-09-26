import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	// THIS IS NOT SECURE!
	// ONlY USED FOR FASTER REDIRECTS. PLEASE, CHECK IN EACH PAGE USING THE API's getSessionCookie() method!
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard", "/settings/:path*", "/whitelist"],
};
