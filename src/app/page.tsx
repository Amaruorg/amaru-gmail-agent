"use client";

import { useState } from "react";
import "./globals.css";

export default function GeminiPage() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setResponse("");

		try {
			const res = await fetch("/api/gemini", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});

			const data = await res.json();

			if (res.ok) {
				setResponse(data.text);
			} else {
				setResponse(`Error: ${data.error}`);
			}
		} catch (err) {
			setResponse(`Error: ${err}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="dark flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 p-4 font-sans">
			<div className="w-full max-w-2xl">
				<div className="rounded-xl border border-slate-800 bg-slate-900 text-slate-50 shadow-lg">
					<div className="flex flex-col space-y-1.5 p-6">
						<h1 className="text-2xl font-semibold leading-none tracking-tight">Prototipo: Chat Gemini</h1>
						<p className="text-sm text-slate-400">Escribe el prompt abajo.</p>
					</div>

					<div className="p-6 pt-0">
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<textarea
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								placeholder="Ej: Hazme un resumen de este correo..."
								className="min-h-[100px] w-full resize-none rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
							/>
							<button
								type="submit"
								disabled={loading || !prompt}
								className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 ring-offset-slate-900 transition-colors hover:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							>
								{loading ? "Generando..." : "Enviar Consulta"}
							</button>
						</form>
					</div>
				</div>

				{response && (
					<div className="mt-6 w-full rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-6 w-6 text-blue-400"
								>
									<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
								</svg>
							</div>
							<div className="flex-1 space-y-2">
								<h2 className="font-semibold text-slate-200">Respuesta de Gemini</h2>
								<p className="text-slate-300 whitespace-pre-wrap">{response}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
