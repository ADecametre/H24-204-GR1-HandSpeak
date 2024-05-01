import db from "@/lib/db";

export default async function Dashboard() {
	const info = await db.users.getCurrentUser();
	return (
		<div>
			<h1>Dashboard</h1>
			<p>{JSON.stringify(info)}</p>
		</div>
	);
}
