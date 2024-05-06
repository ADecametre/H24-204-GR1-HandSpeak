import React from "react";
import {
	Container,
	Flex,
	Group,
	Text,
	Title,
	Accordion,
	AccordionControl,
	AccordionItem,
	AccordionPanel,
} from "@mantine/core";
import IconAPropos from "@/img/Apropos.png";
import Image from "next/image";
import AnimationTitre from "@/components/AnimationTitre";
const questions = [
	{
		emoji: "💵",
		value: "Est-ce que HandSpeak est gratuit ?",
		description: "Oui, HandSpeak est entierement gratuit.",
	},
	{
		emoji: "🧑‍💻",
		value: "À qui s'adresse HandSpeak ?",
		description:
			"HandSpeak s'adresse à toute personne voulant apprendre le langage des signes américain (ASL).",
	},
	{
		emoji: "✨",
		value: "Quels sont les principaux avantages de HandSpeak ?",
		description:
			"HandSpeak propose une grande variété de ressources éducatives gratuites, y compris des leçons et des exercices interactifs, ce qui le rend accessible à tous les apprenants intéressés par l'ASL.",
	},
];
const items = questions.map((item) => (
	<AccordionItem key={item.value} value={item.value}>
		<AccordionControl icon={item.emoji}>{item.value}</AccordionControl>
		<AccordionPanel>{item.description}</AccordionPanel>
	</AccordionItem>
));

export default function APropos() {
	return (
		<Group
			className="bg-gray-100"
			mih="calc(100dvh - 75px)"
			justify="space-evenly"
			py="md"
		>
			<Container size="sm" m={0}>
				<Title order={1} mb="xl">
					À PROPOS DE{" "}
					<Title component="span" c="blue">
						<AnimationTitre></AnimationTitre>
					</Title>
				</Title>
				<Title order={2}> NOTRE MISSION </Title>
				<Text pb={"sm"} mb="sm">
					Notre mission est de rendre l&apos;apprentissage de la langue des
					signes américaine (ASL) accessible à tous, en offrant un site web
					interactif et intuitif. Nous croyons que la communication est un droit
					fondamental, et notre objectif est d&apos;ouvrir les portes de la
					communication pour les malentendants et ceux qui souhaitent apprendre
					la langue des signes.
				</Text>
				<Title order={2}> NOTRE ÉQUIPE </Title>
				<Flex direction="column" mb="sm">
					<Text>Poumale, Martial Romarik</Text>
					<Text>Brichi, Adam </Text>
					<Text>Ibrahim, Adam Jihad </Text>
					<Text>Merabet, Selmane Saïb </Text>
				</Flex>
				<Title order={2} mb="sm">
					FAQ
				</Title>
				<Accordion variant="filled" defaultValue="Question 1">
					{items}
				</Accordion>
			</Container>
			<Image
				src={IconAPropos}
				className="w-[30vw] rounded-xl" // largeur de l'image = 30% de la largeur de la page
				alt="Globe"
			/>
		</Group>
	);
}
