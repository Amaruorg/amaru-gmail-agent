import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/layout/Sidebar';
import '@/style/globals.css';

const inter = Inter({
	subsets: ['latin'],
	weight: ['400'],
});

export const metadata = {
	title: 'Amaru',
	description: 'Amaru - Private AI Chat Application',
};

const sections = [
	{ href: '/test', label: 'Test Components' },
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/whitelist', label: 'Whitelist' },
	{ href: '/settings', label: 'Settings' },
];

export default function PrivateLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-background text-foreground flex h-screen`}>
				<Sidebar sections={sections} />
				{children}
			</body>
		</html>
	);
}
