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
		<AppShellHeader>
			<Group justify="space-between" px={15} py={10}>
				<Group gap="xs">
					<Image src="/Logo.png" width={55} height={55} alt="Logo HandSpeak" />
					<Text
						size="xl"
						fw={800}
						variant="gradient"
						gradient={{ from: "blue", to: "purple", deg: 90 }}
					>
						HANDSPEAK
					</Text>
				</Group>

				<Group justify="space-between" w="30vw" visibleFrom="sm">
					<Link href="/">Acceuil</Link>
					<Link href="/cours">Cours</Link>
					<Link href="">À Propos</Link>
				</Group>
				<Group gap="xs" visibleFrom="sm">
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
