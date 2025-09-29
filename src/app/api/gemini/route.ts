import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI client
const initGeminiAI = () => {
	if (!process.env.GEMINI_API_KEY) {
		throw new Error("GEMINI_API_KEY is not configured in environment variables");
	}
	return new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});
};

export async function POST(req: NextRequest) {
	try {
		const { prompt } = await req.json();

		if (!prompt) {
			return NextResponse.json({ error: "A message is required" }, { status: 400 });
		}

		const genAI = initGeminiAI();

		// Generate content using the GoogleGenAI client
		const response = await genAI.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
		});

		const text = response.text || "No response generated";

		return NextResponse.json({ text });
	} catch (error) {
		console.error("Gemini API Error Details:", error);
		return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
	}
}
