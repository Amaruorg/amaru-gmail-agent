import { ReactNode } from 'react';

export const metadata = {
  title: 'Chat Gemini',
  description: 'Gemini IA Chat',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
