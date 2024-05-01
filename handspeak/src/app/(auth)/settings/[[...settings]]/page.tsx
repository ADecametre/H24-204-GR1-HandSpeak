import { ClerkProvider, SignOutButton, UserProfile } from "@clerk/nextjs";

export default async function Dashboard() {
	return (
		<div>
			<h1>Paramètres</h1>
			<ClerkProvider>
				<UserProfile />
				<SignOutButton />
			</ClerkProvider>
		</div>
	);
}
