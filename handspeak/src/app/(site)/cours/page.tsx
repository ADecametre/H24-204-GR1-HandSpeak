//IMPORTS DE MANTINE (ne pas oublier d'installer le package du carousel)
import { Box, Title, Text, Group } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import CarteCours from "@/components/CarteCours";
import { IconBooks } from "@tabler/icons-react";

import db from "@/lib/db";

export default async function Home() {
	const categories = await db.categories.getListeCours();

	return (
		<Box className="bg-gray-100">
			<Group gap={"xs"} ml={"md"} mr={"md"} pt={"md"}>
				<Title>SELECTION DES COURS</Title>
				<Box visibleFrom="sm">
					<IconBooks size={"45px"} />
				</Box>
			</Group>

			<Text pt={"sm"} pl={"lg"} size="lg">
				Accédez à notre vaste collection de cours sur cette page quand vous
				voulez, où vous voulez.
			</Text>
			<Text pt={"md"} pl={"lg"} size="lg" fw={"bold"}>
				Donnez la parole à vos mains dès aujourd&apos;hui!
			</Text>
			{categories.map((category) => (
				<section key={category.id}>
					<Group pl={"lg"} pt={"md"} gap="xs">
						<i className={`text-5xl text-blue-600 ${category.icon || ""}`} />
						<Title order={2}>{category.name}</Title>
					</Group>

					<Carousel
						slideSize={{ base: "90%", sm: "24%" }}
						slideGap={{ base: "xl", sm: 2 }}
						align="start"
						p={"lg"}
						withControls={false}
					>
						{category.courses.map((course) => (
							<CarouselSlide key={course.id}>
								<CarteCours course={course} />
							</CarouselSlide>
						))}
					</Carousel>
				</section>
			))}
		</Box>
	);
}
