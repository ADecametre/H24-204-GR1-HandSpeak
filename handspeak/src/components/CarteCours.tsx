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

//Déclaration des attributs des cartes
interface CardProps {
	image: string;
	altImage: string;
	titre: string;
	categorie: string;
	description: string;
	link: string;
}
//exportation de la composante carte qui prend en parametres les donnees en haut
export default function CarteCours({
	image,
	titre,
	categorie,
	altImage,
	description,
	link,
}: CardProps) {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mr={"md"}>
			<CardSection>
				<Image src={image} alt={altImage} height={160} />
				<Progress radius="xs" value={0} />
			</CardSection>

			<CardSection p={"sm"}>
				<Title fw={500} order={3}>
					{titre}
				</Title>
				<Badge mt={"xs"}>{categorie}</Badge>
				<Text size="sm" c="dimmed" mt={"xs"}>
					{description}
				</Text>
			</CardSection>
			<CardSection p={"xs"}>
				<Button component={Link} href={link} color="blue" fullWidth radius="md">
					Accéder au cours
				</Button>
			</CardSection>
		</Card>
	);
}
