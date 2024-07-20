import db from "@/lib/db";
import Apprentissage from "@/components/Apprentissage";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: { coursUrl: string };
}) {
	const course = await db.courses.getCoursParURL(params.coursUrl);
	if (!course) redirect("/cours");
	const setProgression = async (
		data: Omit<
			Parameters<typeof db.users.setProgressionUtilisateur>[0],
			"courseId"
		>
	) => {
		"use server";
		const grade = data.grade,
			lessonsDone = data.lessonsDone;
		return await db.users.setProgressionUtilisateur({
			courseId: course.id,
			grade,
			lessonsDone,
		});
	};

	return <Apprentissage course={course} setProgression={setProgression} />;
}
