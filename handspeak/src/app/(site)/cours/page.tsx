//IMPORTS DE MANTINE (ne pas oublier d'installer le package du carousel)
import { Card, Container, DEFAULT_THEME, Title, Text } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import CarteCours, { data } from "@/components/CarteCours";
import AnimationTitre from "@/components/AnimationTitre";
import { IconSortAZ } from "@tabler/icons-react";

export default function Home() {
	//defini le contenu de chaque slide en utilisant les donnees des cartes (voir le data dans la composante CarteCours)
	const slides = data.map((item) => (
		<CarouselSlide key={item.titre}>
			<CarteCours {...item} />
		</CarouselSlide>
	));

	return (
		<>
			<Title pl={"md"} pt={"md"}>
				<Title c={"blue"} component="span">
					<AnimationTitre></AnimationTitre>
				</Title>
				<br />
				SELECTION DES COURS
			</Title>
			<Text pt={"md"} pl={"lg"} size="lg">
				Donnez la parole à vos main avec{" "}
				<Text
					size="md"
					fw={750}
					variant="gradient"
					gradient={{ from: "blue", to: "purple", deg: 90 }}
					component="span"
				>
					HANDSPEAK!
				</Text>
			</Text>
			<Text pt={"sm"} pl={"lg"} size="lg">
				Accédez à notre vaste collection de cours sur cette page dès maintenant.
				Bon apprentissage!
			</Text>

			<Title order={2} pl={"lg"} pt={"md"}>
				L&apos;ALPHABET DANS LA LANGUE DES SIGNES
			</Title>

			<Carousel
				slideSize={{ base: "100%", sm: "25%" }}
				slideGap={{ base: "xl", sm: 2 }}
				align="start"
				slidesToScroll={4}
				p={"lg"}
				withControls={false}
			>
				{slides}
			</Carousel>
		</>
	);
}
