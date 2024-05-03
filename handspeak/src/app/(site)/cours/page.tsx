//IMPORTS DE MANTINE (ne pas oublier d'installer le package du carousel)
import { Card, Container, DEFAULT_THEME, Title } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import CarteCours, { data } from "@/components/CarteCours";

//IMPORTS DE NEXT
import type { Metadata } from "next";
import { useMediaQuery } from "@mantine/hooks";

export const metadata: Metadata = {
	title: "Cours | HandSpeak",
};

export default function Home() {
	//defini le contenu de chaque slide en utilisant les donnees des cartes (voir le data dans la composante CarteCours)
	const slides = data.map((item) => (
		<CarouselSlide key={item.titre}>
			<CarteCours {...item} />
		</CarouselSlide>
	));

	return (
		<>
			<Title pl={"lg"}>L&apos;ALPHABET DANS LA LANGUE DES SIGNES</Title>

			<Carousel
				slideSize={{ base: "100%", sm: "25%" }}
				slideGap={{ base: "xl", sm: 2 }}
				align="start"
				slidesToScroll={4}
			>
				{slides}
			</Carousel>
		</>
	);
}
