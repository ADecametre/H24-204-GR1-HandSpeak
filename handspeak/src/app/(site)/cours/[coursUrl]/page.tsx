// src/app/(site)/cours/[coursUrl]/page.tsx
import {
	getCoursID,
	getLessons,
	getLessonsDone,
	getModel,
	getName,
} from "@/lib/getLessons";
import Apprentissage from "@/components/Apprentissage";

export default async function Page({
	params,
}: {
	params: { coursUrl: string };
}) {
	const lessons = await getLessons(params.coursUrl);
	const model = await getModel(params.coursUrl);
	const courseName = await getName(params.coursUrl);
	const lessonsDone = await getLessonsDone(params.coursUrl);
	const courseID = await getCoursID(params.coursUrl);

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
