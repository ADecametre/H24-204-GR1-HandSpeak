//IMPORTS DE MANTINE (ne pas oublier d'installer le package du carousel)
import { Box, Title, Text, Group } from "@mantine/core";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import CarteCours from "@/components/CarteCours";
import AnimationTitre from "@/components/AnimationTitre";
import { IconBooks } from "@tabler/icons-react";
import { IconAbc } from "@tabler/icons-react";
import { IconNumber123 } from "@tabler/icons-react";

export default function Home() {
	//données concernant les attributs de chaque carte qui présente un cours
	const donneesAlphabet = [
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
			altImage: "ImageCarte",
			titre: "Lettres A-F",
			description: "Lettres A à M - Leçons et Quiz",
			categorie: "Alphabet",
		},
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
			titre: "Lettres G-L",
			categorie: "Alphabet",
			description: "Lettres G à L - Leçons et Quiz",
			altImage: "ImageCarte",
		},
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
			altImage: "ImageCarte",
			titre: "Lettres M-T",
			description: "Lettres M à T - Leçons et Quiz",
			categorie: "Alphabet",
		},
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
			altImage: "ImageCarte",
			titre: "Lettres U-Z",
			description: "Lettres U à Z - Leçons et Quiz",
			categorie: "Alphabet",
		},
	];
	const donneesNumeros = [
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png",
			altImage: "ImageCarte",
			titre: "Chiffres 0-3",
			description: "Chiffres allant de 0 à 3 - Leçons et Quiz",
			categorie: "Chiffres",
		},
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png",
			titre: "Chiffres 4-6",
			categorie: "Chiffres",
			description: "Chiffres allant de 4 à 6 - Leçons et Quiz",
			altImage: "ImageCarte",
		},
		{
			image:
				"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
			altImage: "ImageCarte",
			titre: "Chiffres 7-9",
			description: "Chiffres allant de 7 à 9 - Leçons et Quiz",
			categorie: "Chiffres",
		},
	];
	//defini le contenu de chaque slide en utilisant les donnees des cartes (voir le data dans la composante CarteCours)
	const cartesAlphabet = donneesAlphabet.map((item) => (
		<CarouselSlide key={item.titre}>
			<CarteCours {...item} />
		</CarouselSlide>
	));
	const cartesNumeros = donneesNumeros.map((item) => (
		<CarouselSlide key={item.titre}>
			<CarteCours {...item} />
		</CarouselSlide>
	));

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
			<Group pl={"lg"} pt={"md"} gap="xs">
				<IconAbc size="50px" color="#338DFF" />
				<Title order={2}>DÉCOUVREZ L&apos;ALPHABET</Title>
			</Group>

			<Carousel
				slideSize={{ base: "90%", sm: "24%" }}
				slideGap={{ base: "xl", sm: 2 }}
				align="start"
				p={"lg"}
				withControls={false}
			>
				{cartesAlphabet}
			</Carousel>
			<Group pl={"lg"} pt={"md"} gap="xs">
				<IconNumber123 size="50px" color="#338DFF" />
				<Title order={2}>APPRENEZ LES CHIFFRES</Title>
			</Group>
			<Carousel
				slideSize={{ base: "90%", sm: "24%" }}
				slideGap={{ base: "xl", sm: 2 }}
				align="start"
				p={"lg"}
				withControls={false}
			>
				{cartesNumeros}
			</Carousel>
		</Box>
	);
}
