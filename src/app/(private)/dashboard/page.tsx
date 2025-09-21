import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect('/');
	}
	return (
		<div className="">
			<h1>Welcome to the Dashboard {session.user.name}</h1>
		</div>
	);
}
