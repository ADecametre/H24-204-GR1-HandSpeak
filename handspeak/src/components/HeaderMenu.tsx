"use client";

import Image from "next/image";
import icon from "../app/icon.png";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import {
	Group,
	Button,
	Text,
	Burger,
	AppShellHeader,
	AppShellAside,
	Stack,
	NavLink,
	Center,
} from "@mantine/core";
import type { NavLinkProps } from "@mantine/core";
import type { useDisclosure } from "@mantine/hooks";
import { ClerkProvider } from "@clerk/nextjs";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/clerk-react";

type HeaderMenuProps = {
	disclosure: ReturnType<typeof useDisclosure>;
};

export default function HeaderMenu({
	disclosure: [opened, handlers],
}: HeaderMenuProps) {
	const pathname = usePathname();
	const liens: (NavLinkProps & LinkProps)[] = [
		{ label: "Accueil", href: "/", active: pathname == "/" },
		{ label: "Cours", href: "/cours", active: pathname.startsWith("/cours") },
		{
			label: "À propos",
			href: "/a-propos",
			active: pathname.startsWith("a-propos"),
		},
	];
	const liensJSX = liens.map((lien) => (
		<NavLink
			key={lien.href.toString()}
			component={Link}
			onClick={handlers.close}
			className="rounded-[--mantine-radius-default]"
			{...lien}
		/>
	));
	const boutons = (
		<>
			<SignedOut>
				<SignUpButton>
					<Button variant="filled">Inscription</Button>
				</SignUpButton>
				<SignInButton>
					<Button variant="default">Connexion</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<Center>
					<UserButton
						appearance={{
							elements: { userButtonAvatarBox: "h-[45px] w-[45px]" },
						}}
						showName
					/>
				</Center>
			</SignedIn>
		</>
	);

	return (
		<AppShellHeader h={75}>
			<Group justify="space-between" px={15} py={10} gap={0} h="100%" miw={200}>
				<Link href="/" onClick={handlers.close}>
					<Group gap="xs" className="select-none">
						<Image src={icon} height={55} alt="Logo HandSpeak" />
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

				<Group
					justify="space-around"
					miw="30vw"
					visibleFrom="sm"
					className="[&>*]:w-[initial]"
					gap={0}
				>
					{liensJSX}
				</Group>
				<Burger
					opened={opened}
					onClick={handlers.toggle}
					hiddenFrom="sm"
					size="sm"
				/>
				<ClerkProvider>
					<Group gap="2vw" visibleFrom="sm" justify="right" miw={200}>
						{boutons}
					</Group>
					<AppShellAside py="md" px="xl">
						<Stack>
							{liensJSX}
							<Group gap="lg" grow>
								{boutons}
							</Group>
						</Stack>
					</AppShellAside>
				</ClerkProvider>
			</Group>
		</AppShellHeader>
	);
}
