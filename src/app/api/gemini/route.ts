import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/authClient";
import { headers } from "next/headers";

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		return NextResponse.json({ error: "Unauthorized access. Please, log in." }, { status: 401 });
	}

	try {
		const { prompt } = await req.json();

		if (!prompt) {
			return NextResponse.json({ error: "A message is required" }, { status: 400 });
		}

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
		});

		return NextResponse.json({ text: response.text });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message || "Something went wrong..." }, { status: 500 });
		} else {
			return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
		}
	}
}
