import db from "@/lib/db";
import { Skeleton } from "@mantine/core";
import { Suspense } from "react";

async function Info() {
	const info = await db.users.getCurrentUser();
	return <p>{JSON.stringify(info)}</p>;
}

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<Suspense fallback={<Skeleton height={20} width={700} radius="xl" />}>
				<Info />
			</Suspense>
		</div>
	);
}
