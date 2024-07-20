// src/components/Demo.tsx
"use client";
import { IconCheck } from "@tabler/icons-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import type {
	Category,
	GestureRecognizerOptions,
} from "@mediapipe/tasks-vision";
import Camera from "@/components/Camera";
import Main3D from "@/components/Main3D";
// @ts-ignore
import { Checkmark } from "react-checkmark";
import type { Prisma } from "@prisma/client";

import {
	Box,
	Flex,
	Timeline,
	Title,
	Text,
	Button,
	Container,
	Stack,
	Grid,
	Center,
	Progress,
} from "@mantine/core";
import type db from "@/lib/db";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
	course: NonNullable<Awaited<ReturnType<typeof db.courses.getCoursParURL>>>;
	setProgression: (
		data: Omit<
			Prisma.progressionsUncheckedCreateWithoutUserInput,
			"id" | "courseId"
		>
	) => void;
};

export default function Apprentissage({ course, setProgression }: Props) {
	// LEÇONS
	// Liste de leçons
	const lessons = useMemo(() => course.lessons, [course]);
	// Progression utilisateur
	const progression = useMemo(
		() => course.progressions[0],
		[course.progressions]
	);
	// Leçon en cours
	const [active, setActive] = useState(0);
	// Nombre de leçons terminées
	const [completedLessons, setCompletedLessons] = useState<number>(
		progression?.lessonsDone || 0
	);
	const router = useRouter();
	const nextLesson = () => {
		setActive((current) => Math.min(current + 1, lessons.length - 1));
		if (isQuizDone) router.push("/cours");
	};
	const prevLesson = () => setActive((current) => Math.max(0, current - 1));

	// Résultat de la reconnaissance par l'IA
	const [resultat, setResultat] = useState<Category>();

	// Quiz en cours
	const isQuizActive = useMemo(
		() => lessons[active].label === "Quiz",
		[active, lessons]
	);
	// Quiz terminé
	const [isQuizDone, setIsQuizDone] = useState(false);

	// INTERFACE
	// Checkmark
	const [showCheckmark, setShowCheckmark] = useState(false);
	useEffect(() => {
		setShowCheckmark(false);
	}, [active]);
	// Bouton leçon suivante
	let isButtonActive = useMemo(
		() => (!isQuizActive && completedLessons > active) || isQuizDone,
		[isQuizActive, completedLessons, active, isQuizDone]
	);

	// QUIZ
	// Leçons du quiz (Création d'une copie dans un ordre aléatoire)
	const quizLessons = useMemo(
		() => lessons.slice(0, -1).sort(() => Math.random() - 0.5),
		[lessons, isQuizActive] // eslint-disable-line
	);
	// Leçon en cours dans le quiz
	const [quizActive, setQuizActive] = useState(0);
	// Réinitialisation du résultat si l'utilisateur change de
	useEffect(() => {
		setQuizActive(0);
	}, [active]);

	// RECONNAISSANCE IA
	const expectedGesture = isQuizActive
		? quizLessons[quizActive]
		: lessons[active];
	const isGestureCorrect = resultat?.categoryName === expectedGesture.label;
	const isScoreHigh =
		isGestureCorrect &&
		resultat?.score &&
		(expectedGesture.label === "G"
			? resultat.score >= 0.6
			: resultat.score >= 0.9);
	const optionsIA: GestureRecognizerOptions = useMemo(
		() => ({
			minHandDetectionConfidence: 0.6,
			customGesturesClassifierOptions: {
				scoreThreshold: 0.6,
				categoryAllowlist: [
					isQuizActive ? quizLessons[quizActive].label : lessons[active].label,
				],
			},
		}),
		[isQuizActive, quizLessons, quizActive, lessons, active]
	);

	// MISE À JOUR DE LA PROGRESSION
	// Progression Quiz
	const handleQuizProgress = useCallback(async () => {
		if (!isGestureCorrect) return;

		setShowCheckmark(true);
		await sleep(1500);

		if (quizActive === quizLessons.length - 1) {
			setIsQuizDone(true);
			setCompletedLessons(lessons.length);
		}
		setQuizActive((prev) => Math.min(quizLessons.length - 1, prev + 1));

		setShowCheckmark(false);
	}, [isGestureCorrect, lessons.length, quizActive, quizLessons]);

	// Progression
	useEffect(() => {
		if (isScoreHigh) {
			if (!isQuizActive) {
				setShowCheckmark(true);
				setCompletedLessons((prev) => Math.max(prev, active + 1));
			} else if (!showCheckmark) {
				handleQuizProgress();
			}
		}
	}, [active, handleQuizProgress, isQuizActive, isScoreHigh, showCheckmark]);

	// SAUVEGARDE MONGODB
	useEffect(() => {
		const grade = quizActive / quizLessons.length,
			lessonsDone = completedLessons;

		if (
			grade == (progression?.grade || 0) &&
			lessonsDone == (progression?.lessonsDone || 0)
		)
			return;

		setProgression({
			grade: Math.max(
				progression?.grade || 0,
				quizActive / (quizLessons.length - 1)
			),
			lessonsDone: completedLessons,
		});
	}, [
		completedLessons,
		progression?.grade,
		progression?.lessonsDone,
		quizActive,
		quizLessons.length,
		setProgression,
	]);

	return (
		<Container>
			<Stack justify="space-evenly" className="min-h-[70dvh]" gap-0>
				<Flex c={"blue"} direction={"column"} ta="center">
					<Title fw={1000}>{course.name}</Title>
					<Text size="xl" fw={1000}>
						{lessons[active].name}
					</Text>
				</Flex>
				<Grid justify="space-between" align="center" className="flex-nowrap">
					<Grid.Col span={{ base: 6, sm: 3 }} className=" content-center">
						<Timeline active={active} bulletSize={20} lineWidth={2}>
							{lessons.map((lesson, index) => (
								<Timeline.Item
									key={index}
									bullet={
										completedLessons > index || isQuizDone ? (
											<IconCheck size={12} />
										) : undefined
									}
									title={
										<Text size="sm" fw={500}>
											{index === lessons.length - 1 ? "Quiz" : lesson.name}
										</Text>
									}
									onClick={() => completedLessons >= index && setActive(index)}
									className={
										completedLessons >= index
											? "cursor-pointer"
											: "cursor-not-allowed text-gray-400"
									}
								/>
							))}
						</Timeline>
					</Grid.Col>
					<Grid.Col
						span={{ base: 6, sm: 4 }}
						className="max-h-[30dvh] md:min-h-[50dvh] content-center"
					>
						{isQuizActive ? (
							<Box c={"blue"}>
								<Center>
									<Text size="xl" fw={1000}>
										Faites {quizLessons[quizActive].name}
									</Text>
								</Center>
								<Progress
									value={
										isQuizDone ? 100 : (quizActive * 100) / quizLessons.length
									}
									size="lg"
									transitionDuration={200}
									mt={30}
								/>
							</Box>
						) : (
							<Main3D path={lessons[active].model3d} />
						)}
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 3 }}>
						<Center>
							<Box className="relative">
								<Camera
									options={optionsIA}
									modelePath={`${process.cwd()}${course.model}`}
									setResultat={setResultat}
									className="w-auto max-h-[20dvh] md:max-h-[50dvh]"
								/>
								{showCheckmark && (
									<div className="absolute bottom-1 right-1">
										<Checkmark size="large" color="#228be6" />
									</div>
								)}
								<Text
									ta="center"
									size="lg"
									className="absolute bottom-1 left-2 text-white drop-shadow-md"
									fw={800}
								>
									{resultat?.categoryName &&
										Math.round(resultat.score * 100) + " %"}
								</Text>
							</Box>
						</Center>
					</Grid.Col>
				</Grid>
				<Flex gap="xl" justify="center">
					<Button variant="default" onClick={prevLesson}>
						Retour
					</Button>
					<Button
						onClick={nextLesson}
						disabled={!isButtonActive}
						className={`${isButtonActive ? "animate-polse" : ""} `}
					>
						{isQuizActive ? "Terminer" : "Prochaine leçon"}
					</Button>
				</Flex>
			</Stack>
		</Container>
	);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
