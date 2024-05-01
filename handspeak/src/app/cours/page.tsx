import { Text } from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cours | HandSpeak",
};

export default function Home() {
	return (
		<>
			<Text>LISTE DES COURS DISPONIBLES</Text>
		</>
	);
}
