import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
	try {
		const { prompt } = await req.json();

		if (!prompt) {
			return NextResponse.json({ error: 'Un mensaje es requerido' }, { status: 400 });
		}

		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: prompt,
		});

		return NextResponse.json({ text: response.text });
	} catch (error: any) {
		return NextResponse.json({ error: error.message || 'Algo salio mal...' }, { status: 500 });
	}
}
