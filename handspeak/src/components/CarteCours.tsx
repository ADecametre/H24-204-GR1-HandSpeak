import {
	Card,
	Image,
	Badge,
	Button,
	Progress,
	CardSection,
	Title,
	rem,
	Text,
} from "@mantine/core";
import Link from "next/link";
import NextImage from "next/image";
import type db from "@/lib/db";
import { IconAward } from "@tabler/icons-react";

export default function CarteCours({
	course,
}: {
	course: Awaited<
		ReturnType<typeof db.categories.getListeCours>
	>[number]["courses"][number];
}) {
	const img = course.img;
	const icon = <IconAward style={{ width: rem(12), height: rem(12) }} />;
	const progression = course.progressions[0];

	const lessonsDone = progression?.lessonsDone || 0;
	const totalLessons = course.lessons.length;
	const grade = progression?.grade || 0;

	const progressValue = (lessonsDone / totalLessons) * 100;
	const gradeValue = grade * 100;

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mr={"md"}>
			<CardSection>
				<Image
					component={NextImage}
					src={img}
					alt={course.name}
					sizes="50vw 100vw"
					width={0}
					height={0}
				/>
				<Progress radius="xs" value={progressValue} />
			</CardSection>
			<CardSection p={"sm"}>
				<Title fw={500} order={3}>
					{course.name}
				</Title>
				<Badge rightSection={icon} mt={"xs"}>
					{gradeValue}%
				</Badge>
				<Text size="sm" c="dimmed" mt="xs">
					{course.description}
				</Text>
			</CardSection>
			<CardSection p={"xs"}>
				<Button
					component={Link}
					href={`/cours/${course.url}`}
					color="blue"
					fullWidth
					radius="md"
				>
					Accéder au cours
				</Button>
			</CardSection>
		</Card>
	);
}
