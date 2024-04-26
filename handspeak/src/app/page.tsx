import { Button, Container, Group, Space, Text, Title } from "@mantine/core";

import Image from "next/image";
import IconAccueil from "../img/IconAccueil.png";

export default function Home() {
	return (
		<Group
			justify="space-evenly"
			className="bg-gray-100"
			mih="calc(100dvh - 75px)" // hauteur minimale = hauteur de la page - hauteur de la barre de navigation
			py="md"
		>
			<Container
				size="sm"
				m={0} // marge de 0 pour que space-evenly ait tout son effet
			>
				<Title textWrap="pretty">
					DÉCOUVREZ LA LANGUE DES SIGNES GRATUITEMENT ET EFFICACEMENT AVEC{" "}
					<Title component="span" c="blue">
						HANDSPEAK
					</Title>
				</Title>
				<Space h="xl" />
				<Title order={2}>Grande variété de cours disponibles</Title>
				<Text>
					Apprenez les bases de la langue des signes à travers notre collection
					de cours sur divers sujets et thèmes
				</Text>
				<Space h="md" />
				<Title order={2}>Animations 3D des gestes de l&apos;ASL</Title>
				<Text>
					Visualisez facilement les gestes ainsi que les signes à effectuer avec
					des animations 3D modernes
				</Text>
				<Space h="md" />
				<Title order={2}>Exercices amusants et pratiques</Title>
				<Text>
					Mémorisez de manière plus efficace le contenu de chaque cours grâce à
					nos exercises amusants qui font l&apos;utilisation de votre caméra en
					temps réel pour valider vos réponses
				</Text>
				<Space h="xl" />
				<Group>
					<Button radius="xl">Commencez ici</Button>
					<Button radius="xl" variant="default">
						Compte existant?
					</Button>
				</Group>
			</Container>
			<Image
				src={IconAccueil}
				className="w-[40vw]" // largeur de l'image = 40% de la largeur de la page
				alt="Globe"
			/>
		</Group>
	);
}
