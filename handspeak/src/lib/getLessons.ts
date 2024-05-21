import db from "@/lib/db";
import prisma from "@/lib/db";

/* export function setProgressionUtilisateur(
	coursID: string,
	lessonsDone: number,
	grade: number
) {
	db.users.setProgressionUtilisateur({
		courseId: coursID,
		grade: grade,
		lessonsDone: lessonsDone,
	});
} */

/* export async function setProgressionUtilisateur(
	courseUrl: string,
	lessonsDone: number,
	grade: number
) {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	await db.users.setProgressionUtilisateur({
		courseId: cours?.id ?? "",
		grade: grade,
		lessonsDone: lessonsDone,
	});
} */
/* export const getLessons = async (courseUrl: string) => {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	return cours ? cours.lessons.map((lesson) => lesson.label) : [];
};
export const getModel = async (courseUrl: string) => {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	return cours?.model;
};
export const getName = async (courseUrl: string) => {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	return cours?.name;
};
export const getLessonsDone = async (courseUrl: string) => {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	return cours?.progressions[0]?.lessonsDone || 0;
};
export const getCoursID = async (courseUrl: string) => {
	const cours = await prisma.courses.getCoursParURL(courseUrl);
	return cours?.id;
}; */
