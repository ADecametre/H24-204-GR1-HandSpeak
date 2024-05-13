"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import { Category, GestureRecognizerOptions } from "@mediapipe/tasks-vision";
import Camera from "@/components/Camera";
import Main3D from "@/components/Main3D";

import {
	Box,
	Flex,
	Timeline,
	TimelineItem,
	Title,
	Text,
	Button,
	Container,
} from "@mantine/core";

export default function Demo() {
	const [active, setActive] = useState(0);
	const lessons = ["A", "B", "C", "D", "E", "F"];
	const [completedLessons, setCompletedLessons] = useState<string[]>([]);

	const [resultat, setResultat] = useState<Category>();

	const options: GestureRecognizerOptions = useMemo(
		() => ({
			minHandDetectionConfidence: 0.9,
			cannedGesturesClassifierOptions: {
				scoreThreshold: 0.8,
				categoryDenylist: ["Thumb_Down"],
			},
		}),
		[]
	);

	const nextStep = () => {
		setActive((current) =>
			current < lessons.length - 1 ? current + 1 : current
		);
		setCompletedLessons((prev) => [...prev, lessons[active]]);
	};
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Container>
			<Flex justify="space-between" align="flex-start">
				<Box className="w-1/5 mr-4">
					<Timeline active={active} bulletSize={24} lineWidth={2}>
						{lessons.map((lesson, index) => (
							<Timeline.Item
								key={index}
								bullet={
									completedLessons.includes(lesson) ? (
										<IconCheck size={12} />
									) : undefined
								}
								title={
									<Text size="md" fw={500}>
										Leçon {lesson}
									</Text>
								}
							/>
						))}
					</Timeline>
				</Box>
				<Box className="flex-grow flex flex-col justify-between items-center h-[calc(100vh-75px)]">
					<Flex direction="column" align="center" className="flex-grow">
						<Title c={"blue"} fw={1000}>
							Cours A-F
						</Title>
						<Text size="xl" c={"blue"} fw={1000}>
							Leçon {lessons[active]}
						</Text>
						<Main3D letter={lessons[active]} />
						<Flex gap="xs" justify="center" className="w-full px-4 pb-4 pt-4">
							<Button variant="default" onClick={prevStep}>
								Retour
							</Button>
							<Button onClick={nextStep}>Prochaine leçon</Button>
						</Flex>
					</Flex>
				</Box>
				<Box className="w-3/10 ml-4">
					<Camera
						options={options}
						modelePath={`${process.cwd()}modeles/gesture_recognizer.task`}
						setResultat={setResultat}
						className="w-[20dvw] h-[15dvw]"
					/>
					<Text ta="center" size="lg" fw={800}>
						{resultat?.categoryName}
						<br />
						{Math.round((resultat?.score || 0) * 100)} %
					</Text>
				</Box>
			</Flex>
		</Container>
	);
}
