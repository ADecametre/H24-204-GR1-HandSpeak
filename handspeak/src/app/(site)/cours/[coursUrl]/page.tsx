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
	const lessons = course.lessons.map((lesson) => lesson.label);
	const model = course.model;
	const courseName = course.name;
	const lessonsDone = course.progressions[0]?.lessonsDone || 0;
	const courseID = course.id;

	return (
		<Apprentissage
			lessons={lessons}
			model={model}
			courseName={courseName}
			courseUrl={params.coursUrl}
			lessonsDone={lessonsDone}
			coursID={courseID}
		/>
	);
}
