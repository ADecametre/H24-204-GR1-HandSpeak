// src/components/Demo.tsx
"use client";
import { IconCheck } from "@tabler/icons-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Category, GestureRecognizerOptions } from "@mediapipe/tasks-vision";
import Camera from "@/components/Camera";
import Main3D from "@/components/Main3D";
// @ts-ignore
import { Checkmark } from "react-checkmark";

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

type Props = {
	lessons: string[];
	model: string | undefined;
	courseName: string | undefined;
	courseUrl: string;
	lessonsDone: number;
	coursID: string | undefined;
};

export default function Demo({
	lessons,
	model,
	courseName,
	courseUrl,
	lessonsDone,
	coursID,
}: Props) {
	const [active, setActive] = useState(0);
	const [resultat, setResultat] = useState<Category>();

	console.log("resultat:", resultat);

	const [completedLessons, setCompletedLessons] = useState<number>(lessonsDone);
	const [isButtonActive, setIsButtonActive] = useState(false);
	const [showCheckmark, setShowCheckmark] = useState(false);
	const [isUserDone, setIsUserDone] = useState(false);
	const [isQuizActive, setIsQuizActive] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	const quizLetters = useMemo(() => {
		const lessonsCopy = lessons.slice(0, -1);
		return lessonsCopy.sort(() => Math.random() - 0.95) || [];
	}, [lessons]);
	const [quizLetter, setQuizLetter] = useState(0);

	const handleQuizProgress = useCallback(async () => {
		setIsProcessing(true);
		setShowCheckmark(true);
		await sleep(2000);
		setShowCheckmark(false);

		if (
			quizLetter < quizLetters.length - 1 &&
			resultat?.categoryName === quizLetters[quizLetter]
		) {
			setQuizLetter((prev) => prev + 1);
		}
		if (quizLetter === quizLetters.length - 1) {
			setIsUserDone(true);
		}
		setIsProcessing(false);
	}, [quizLetter, quizLetters, resultat?.categoryName]);

	const expectedGesture = isQuizActive
		? quizLetters[quizLetter]
		: lessons[active];
	const isGestureCorrect = resultat?.categoryName === expectedGesture;
	const isScoreHigh =
		isGestureCorrect &&
		resultat?.score &&
		((expectedGesture === "G" && resultat.score >= 0.6) ||
			resultat.score >= 0.9);

	useEffect(() => {
		// const updateProgression = async () => {
		// 	await fetch("/handspeak/src/app/api/setProgressionUtilisateur", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			courseId: coursID,
		// 			grade: isUserDone ? 1 : 0,
		// 			lessonsDone: completedLessons,
		// 		}),
		// 	}).catch((error) => console.error(error));
		// };

		// updateProgression();

		setIsQuizActive(active === lessons.length - 1);

		console.log(isQuizActive);

		if (completedLessons > active) {
			setIsButtonActive(true);
		}
		if (!isQuizActive && isScoreHigh) {
			if (completedLessons > active) {
				setIsButtonActive(true);
				setShowCheckmark(true);
			} else {
				setCompletedLessons((prev) => prev + 1);
			}
		}
		if (isQuizActive && isScoreHigh && !isProcessing) {
			handleQuizProgress();
		}
	}, [
		resultat,
		active,
		lessons,
		quizLetters,
		quizLetter,
		isQuizActive,
		showCheckmark,
		isProcessing,
		handleQuizProgress,
		isScoreHigh,
		courseUrl,
		lessonsDone,
		isUserDone,
		completedLessons,
		coursID,
	]);

	const options: GestureRecognizerOptions = useMemo(
		() => ({
			minHandDetectionConfidence: expectedGesture === "G" ? 0.6 : 0.9,
			customGesturesClassifierOptions: {
				scoreThreshold: expectedGesture === "G" ? 0.6 : 0.9,
				categoryAllowlist: [
					isQuizActive ? quizLetters[quizLetter] : lessons[active],
				],
			},
		}),
		[expectedGesture, isQuizActive, quizLetters, quizLetter, lessons, active]
	);
	const nextStep = () => {
		setActive((current) =>
			current < lessons.length - 1 ? current + 1 : current
		);
		setIsButtonActive(false);
		setShowCheckmark(false);
	};
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Container>
			<Stack justify="space-evenly" className="min-h-[70dvh]" gap-0>
				<Flex c={"blue"} direction={"column"} ta="center">
					<Title fw={1000}>{courseName}</Title>
					<Text size="xl" fw={1000}>
						{lessons[active]}
					</Text>
				</Flex>
				<Grid justify="space-between" align="center" className="flex-nowrap">
					<Grid.Col span={{ base: 6, sm: 3 }} className=" content-center">
						<Timeline active={active} bulletSize={20} lineWidth={2}>
							{lessons.map((lesson, index) => (
								<Timeline.Item
									key={index}
									bullet={
										completedLessons > index || isUserDone ? (
											<IconCheck size={12} />
										) : undefined
									}
									title={
										<Text size="sm" fw={500}>
											{index === lessons.length - 1
												? "Quiz"
												: `Leçon ${lesson}`}
										</Text>
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
										Faites la lettre {quizLetters[quizLetter]}
									</Text>
								</Center>
								<Progress
									value={
										isUserDone ? 100 : (quizLetter * 100) / quizLetters.length
									}
									size="lg"
									transitionDuration={200}
									mt={30}
								/>
							</Box>
						) : (
							<Main3D letter={lessons[active].toLowerCase()} />
						)}
					</Grid.Col>
					<Grid.Col span={{ base: 12, sm: 3 }}>
						<Center>
							<Box className="relative">
								<Camera
									options={options}
									modelePath={`${process.cwd()}${model}`}
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
					<Button variant="default" onClick={prevStep}>
						Retour
					</Button>
					<Button
						onClick={nextStep}
						disabled={!isButtonActive && !isUserDone}
						className={`${
							isButtonActive || isUserDone ? "animate-polse" : ""
						} `}
					>
						{isQuizActive ? "Terminer" : "Prochaine leçon"}
					</Button>
				</Flex>
			</Stack>
		</Container>
	);
}
