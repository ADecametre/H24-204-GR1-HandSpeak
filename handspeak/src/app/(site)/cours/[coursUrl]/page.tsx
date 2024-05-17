"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState, useMemo, useEffect } from "react";
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
	Group,
	Stack,
	Center,
} from "@mantine/core";

export default function Demo() {
	const [active, setActive] = useState(0);
	const lessons = useMemo(() => ["A", "B", "C", "D", "E", "F"], []);
	const [completedLessons, setCompletedLessons] = useState<number>(0);

	const [resultat, setResultat] = useState<Category>();

	const [isButtonActive, setIsButtonActive] = useState(false);
	const [showCheckmark, setShowCheckmark] = useState(false);

	useEffect(() => {
		if (
			completedLessons > active ||
			(resultat?.score && resultat.score >= 0.95)
		) {
			setIsButtonActive(true);
			setShowCheckmark(true);
		}
		if (
			resultat?.score &&
			resultat.score >= 0.95 &&
			active >= completedLessons
		) {
			setCompletedLessons((prev) => prev + 1);
		}
	}, [resultat, active, completedLessons, lessons]);

	const options: GestureRecognizerOptions = useMemo(
		() => ({
			minHandDetectionConfidence: 0.9,
			customGesturesClassifierOptions: {
				scoreThreshold: 0.8,
				categoryAllowlist: [lessons[active]],
			},
		}),
		[lessons, active]
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
			<Flex c={"blue"} direction={"column"} ta="center">
				<Title fw={1000}>Cours A-F</Title>
				<Text size="xl" fw={1000}>
					Leçon {lessons[active]}
				</Text>
			</Flex>
			<Group justify="space-between" align="center" wrap="wrap" grow>
				<Timeline active={active} bulletSize={24} lineWidth={2}>
					{lessons.map((lesson, index) => (
						<Timeline.Item
							key={index}
							bullet={
								completedLessons > index ? <IconCheck size={12} /> : undefined
							}
							title={
								<Text size="md" fw={500}>
									Leçon {lesson}
								</Text>
							}
						/>
					))}
				</Timeline>
				<Flex className="flex-grow" direction="column" align="center">
					<Main3D letter={lessons[active].toLowerCase()} />
				</Flex>
				<Stack className="items-end">
					<Box className="relative">
						<Camera
							options={options}
							modelePath={`${process.cwd()}modeles/a-f.task`}
							setResultat={setResultat}
							className="min-w-[16dvw] min-h-[12dvw] sm:max-w-[20dvw]"
						/>
						{showCheckmark && (
							<div className="absolute bottom-16 right-1">
								<Checkmark size="large" color="#228be6" />
							</div>
						)}
						<Text ta="center" size="lg" fw={800}>
							&nbsp;{resultat?.categoryName}
							<br />
							&nbsp;
							{resultat?.categoryName &&
								Math.round(resultat.score * 100) + " %"}
						</Text>
					</Box>
				</Stack>
			</Group>
			<Flex gap="xl" justify="center" className="w-full px-4 pb-4 pt-4">
				<Button variant="default" onClick={prevStep}>
					Retour
				</Button>
				<Button
					onClick={nextStep}
					disabled={!isButtonActive}
					className={`${isButtonActive ? "animate-polse" : ""} `}
				>
					Prochaine leçon
				</Button>
			</Flex>
		</Container>
	);
}
