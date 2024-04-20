//Imports de next
import Image from "next/image";
import Link from "next/link";
//imports de Mantine
import {
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	SimpleGrid,
	ThemeIcon,
	Anchor,
	Divider,
	Center,
	Box,
	Burger,
	Drawer,
	Collapse,
	ScrollArea,
	rem,
	useMantineTheme,
	AppShellHeader,
	AppShellNavbar,
} from "@mantine/core";
//Fonction de la composante exportée
export default function Name() {
	return (
		<AppShellHeader className="sticky">
			<Group justify="space-between" h="100%" ml="40" mr="40">
				<Group>
					<Image src="/Logo.png" width={85} height={85} alt="Logo HandSpeak" />
					<Text
						size="xl"
						fw={800}
						variant="gradient"
						gradient={{ from: "blue", to: "purple", deg: 90 }}
						pb={10}
					>
						HANDSPEAK
					</Text>
				</Group>

				<Group h="100%" gap={100} visibleFrom="sm">
					<Link href="/">Acceuil</Link>
					<Link href="/cours">Cours</Link>
					<Link href="">À Propos</Link>
				</Group>
				<Group visibleFrom="sm">
					<Button variant="filled">Inscription</Button>
					<Button variant="default">Connexion</Button>
				</Group>
				<Burger hiddenFrom="sm" />
				<AppShellNavbar py="md" px={4}>
					<UnstyledButton ml="20">Acceuil</UnstyledButton>
					<UnstyledButton ml="20">Cours</UnstyledButton>
					<UnstyledButton ml="20">À propos</UnstyledButton>
					<Button variant="filled">Inscription</Button>
					<Button variant="default">Connexion</Button>
				</AppShellNavbar>
			</Group>
		</AppShellHeader>
	);
}
