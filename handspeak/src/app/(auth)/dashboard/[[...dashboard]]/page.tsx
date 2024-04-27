import { ClerkProvider, UserProfile } from "@clerk/nextjs";

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<ClerkProvider>
				<UserProfile />
			</ClerkProvider>
		</div>
	);
}
