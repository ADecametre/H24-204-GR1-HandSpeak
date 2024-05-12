"use client";

import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
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
				// N'utilise pas style. Avec Tailwind, tu peux faire className="h-[100vh]"
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
							// TODO: Remplace Timeline.I
								key={index}
								bullet={
									completedLessons.includes(lesson) && <IconCheck size={12} />
								}
								title={<div style={{ paddingTop: "2px" }}>Leçon {lesson}</div>}
								// TODO: Pourquoi est-ce que t'as utilisé un div pour du texte ? Utilise Text ou Title de Mantine
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
			</Flex>
		</Container>
	);
}
