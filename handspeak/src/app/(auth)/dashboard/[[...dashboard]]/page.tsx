import { UserProfile } from "@clerk/nextjs";

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<UserProfile />
		</div>
	);
}
