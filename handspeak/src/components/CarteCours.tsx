import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Progress,
	CardSection,
	Title,
} from "@mantine/core";
import Link from "next/link";
import NextImage from "next/image";
import type db from "@/lib/db";

export default function CarteCours({
	course,
}: {
	course: Awaited<
		ReturnType<typeof db.categories.getListeCours>
	>[number]["courses"][number];
}) {
	const progression = course.progressions[0];

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mr={"md"}>
			<CardSection>
				<Image
					component={NextImage}
					src={course.img}
					alt={course.name}
					sizes="50vw 100vw"
					width={0}
					height={0}
				/>
				<Progress radius="xs" value={0} />
			</CardSection>

			<CardSection p={"sm"}>
				<Title fw={500} order={3}>
					{course.name}
				</Title>
				<Badge mt={"xs"}>{course.categoryId}</Badge>
				<Text size="sm" c="dimmed" mt={"xs"}>
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
