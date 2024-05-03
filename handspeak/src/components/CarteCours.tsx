import {
	Card,
	Image,
	Text,
	Badge,
	Button,
	Group,
	CardSection,
	Title,
	Flex,
} from "@mantine/core";

//données concernant les attributs de chaque carte qui présente un cours
export const data = [
	{
		image:
			"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
		altImage: "truc",
		titre: "Best forests to visit in North America",
		description: "ipsum lorem",
		categorie: "nature",
	},
	{
		image:
			"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
		titre: "Hawaii beaches review: better than you think",
		categorie: "beach",
		description: "ipsum lorem",
		altImage: "truc",
	},
];
//Déclaration des attributs des cartes
interface CardProps {
	image: string;
	altImage: string;
	titre: string;
	categorie: string;
	description: string;
}
//exportation de la composante carte qui prend en parametres les donnees en haut
export default function CarteCours({
	image,
	titre,
	categorie,
	altImage,
	description,
}: CardProps) {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mr={"md"}>
			<Flex justify="space-between" direction={"column"}>
				<CardSection h="50px">
					<Text size="md">{categorie}</Text>
					<Image src={image} alt={altImage} height={160} pb={"md"} />
				</CardSection>

				<CardSection pt={250} pb={15} p={20}>
					<Title fw={500}>{titre}</Title>

					<Text size="sm" c="dimmed">
						{description}
					</Text>
					<Button color="blue" fullWidth mt="md" radius="md">
						Accéder au cours
					</Button>
				</CardSection>
			</Flex>
		</Card>
	);
}
