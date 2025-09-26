import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/style/globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Amaru",
	description: "Amaru - Private AI Gmail Agent",
};

export default function PrivateLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-background text-foreground flex h-screen w-full overflow-hidden`}>
				<div className="h-full flex-1 overflow-y-auto p-5">{children}</div>
			</body>
		</html>
	);
}
