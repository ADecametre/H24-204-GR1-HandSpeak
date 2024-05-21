// /pages/api/setProgressionUtilisateur.ts
"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// Ensure the request is a POST request
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	// Extract data from the request body
	const { courseId, grade, lessonsDone } = req.body;

	// Check for missing data
	if (!courseId || grade === undefined || lessonsDone === undefined) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	// Update the user's progression
	await prisma.users.setProgressionUtilisateur({
		courseId,
		grade,
		lessonsDone,
	});

	// Respond with success
	res.status(200).json({ message: "Progression updated successfully" });
};

export default handler;
