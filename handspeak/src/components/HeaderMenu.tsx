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
	AppShellAside,
	Flex,
	Stack,
} from "@mantine/core";

type HeaderMenuProps = { opened: boolean; toggle: () => void };

export default function HeaderMenu({ opened, toggle }: HeaderMenuProps) {
	const liens = (
		<>
			<Link href="/">Acceuil</Link>
			<Link href="/cours">Cours</Link>
			<Link href="">À Propos</Link>
		</>
	);
	const boutons = (
		<>
			<Button variant="filled">Inscription</Button>
			<Button variant="default">Connexion</Button>
		</>
	);

	return (
		<AppShellHeader>
			<Group justify="space-between" px={15} py={10}>
				<Link href="/">
					<Group gap="xs" className="select-none">
						<Image
							src="/Logo.png"
							width={55}
							height={55}
							alt="Logo HandSpeak"
						/>
						<Text
							size="xl"
							fw={800}
							variant="gradient"
							gradient={{ from: "blue", to: "purple", deg: 90 }}
						>
							HANDSPEAK
						</Text>
					</Group>
				</Link>

				<Group justify="space-between" w="30vw" visibleFrom="sm">
					{liens}
				</Group>
				<Group gap="xs" visibleFrom="sm">
					{boutons}
				</Group>
				<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
				<AppShellAside py="md" px={4}>
					<Stack justify="space-around" gap="xl" align="center">
						{liens}
						<Group gap="lg" grow>
							{boutons}
						</Group>
					</Stack>
				</AppShellAside>
			</Group>
		</AppShellHeader>
	);
}
