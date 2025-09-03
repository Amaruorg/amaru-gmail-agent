'use client';

import { useState } from 'react';

export default function GeminiPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div>
      <h1>Chatea con Gemini AI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe aqui..."
        />
        <button
          type="submit"
          disabled={loading || !prompt}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {response && (
        <div>
          {response}
        </div>
      )}
    </div>
  );
}
