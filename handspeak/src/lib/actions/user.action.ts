"use server";

import db from "../db";

export async function createUser(clerkId: string) {
	const user = await db.users.create({ data: { clerkId } });
	return JSON.parse(JSON.stringify(user));
}

export async function deleteUser(clerkId: string) {
	await db.users.delete({ where: { clerkId } });
}
