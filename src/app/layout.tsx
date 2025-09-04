import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Chat Gemini",
	description: "Gemini IA Chat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-background`}>{children}</body>
		</html>
	);
}
