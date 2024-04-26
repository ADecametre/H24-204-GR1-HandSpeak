//imports mantine
import { Button, Container, Group, Text, Title } from "@mantine/core";
//imports next
import Image from "next/image";
//imports composantes JSX
export default function Home() {
	return (
		<Group bg={"#ecf0f1"}>
			<Container size={"sm"} pb={"200px"}>
				<Title textWrap="pretty">
					DÉCOUVREZ LA LANGUE DES SIGNES GRATUITEMENT ET EFFICACEMENT AVEC
				</Title>
				<Title c={"blue"} pb={"sm"}>
					HANDSPEAK
				</Title>
				<Title order={2}>Grande variété de cours disponibles</Title>
				<Text pb={"sm"}>
					Apprenez les bases de la langue des signes à travers notre collection
					de cours sur divers sujets et thèmes
				</Text>
				<Title order={2}>Animations 3D des gestes de l&apos;ASL</Title>
				<Text pb={"sm"}>
					Visualisez facilement les gestes ainsi que les signes à effectuer avec
					des animations 3D modernes
				</Text>
				<Title order={2}>Exercises amusants et pratiques</Title>
				<Text pb={"sm"}>
					Mémorisez de manière plus efficace le contenu de chaque cours grâce à
					nos exercises amusants qui font l&apos;utilisation de votre caméra en
					temps réel pour valider vos réponses
				</Text>
				<Group pt={"md"}>
					<Button radius={"xl"}>Commencez ici</Button>
					<Button radius={"xl"} variant="default">
						Compte existant?
					</Button>
				</Group>
			</Container>
			<Image src="/IconAcceuil.png" width={717} height={663} alt="Globe" />
		</Group>
	);
}
