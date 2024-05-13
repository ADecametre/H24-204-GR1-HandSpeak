"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import { Category, GestureRecognizerOptions } from "@mediapipe/tasks-vision";
import Camera from "@/components/Camera";
import Main3D from "@/components/Main3D";

import {
	Box,
	Flex,
	Stepper,
	Timeline,
	TimelineItem,
	Title,
	Text,
	Group,
	Button,
	Image,
	Center,
	Container,
	rem,
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
			<Flex
				justify="center"
				//align="center"
				wrap="nowrap"
			>
				<Box pr="5rem">
					<Timeline
						active={active}
						bulletSize={24}
						lineWidth={2}
						style={{
							transition: "all 1.5s",
						}}
					>
						{lessons.map((lesson, index) => (
							<Timeline.Item
								key={index}
								bullet={
									completedLessons.includes(lesson) && <IconCheck size={12} />
								}
								title={
									<Text size="md" fw={500}>
										Leçon {lesson}
									</Text>
								}
							></Timeline.Item>
						))}
					</Timeline>
				</Box>
				<Container fluid>
					<Flex
						justify="center"
						align="center"
						direction="column"
						wrap="nowrap"
					>
						<Title c={"blue"} fw={1000}>
							Cours A-F
						</Title>
						<Text size="xl" c={"blue"} fw={1000}>
							Leçon {lessons[active]}
						</Text>
						<Flex
							mih={50}
							gap="xs"
							justify="center"
							align="center"
							direction="column"
							wrap="wrap"
						>
							<Camera
								options={options}
								modelePath={`${process.cwd()}modeles/gesture_recognizer.task`}
								setResultat={setResultat}
								className="w-[20dvw] h-[15dvw] border-2 border-blue-100"
							/>
							<Text ta="center" size="lg" fw={800}>
								{resultat?.categoryName}
								<br />
								{Math.round((resultat?.score || 0) * 100)} %
							</Text>
						</Flex>
						<Flex
							gap="xs"
							justify="center"
							align="center"
							direction="row"
							wrap="wrap"
							mt="xl"
						>
							<Button variant="default" onClick={prevStep}>
								Retour
							</Button>
							<Button onClick={nextStep}>Prochaine leçon</Button>
						</Flex>
					</Flex>
				</Container>
				<Main3D letter = {lessons[active]}/>
			</Flex>
		</Container>
	);
}
