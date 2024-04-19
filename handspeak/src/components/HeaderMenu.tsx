//Imports de next
import Image from "next/image";
import Link from "next/link";
//imports de Mantine
import {
	AppShell,
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
} from "@mantine/core";
//Fonction de la composante exportée
export default function Name() {
	return (
		<AppShell>
			<AppShellHeader>
				<Box>
					<Group justify="space-between" h="100%" ml="40" mr="40">
						<Group>
							<Image
								src="/Logo.png"
								width={75}
								height={75}
								alt="Logo HandSpeak"
							/>
							<Text>HandSpeak</Text>
						</Group>

						<Group h="100%" gap={100} visibleFrom="sm">
							<Link href="/">Acceuil</Link>
							<Link href="/test-camera">Cours</Link>
							<Link href="">À Propos</Link>
						</Group>
						<Group>
							<Button variant="default">Sign up</Button>
							<Button variant="default">Log in</Button>
						</Group>
					</Group>
				</Box>
			</AppShellHeader>
		</AppShell>
	);
}
