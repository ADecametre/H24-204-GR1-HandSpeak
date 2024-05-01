"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, AppShellMain } from "@mantine/core";
import HeaderMenu from "./HeaderMenu";

export default function Shell({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [opened, handlers] = useDisclosure();
	return (
		<AppShell
			header={{ height: 75 }}
			aside={{
				width: 300,
				breakpoint: "sm",
				collapsed: { desktop: true, mobile: !opened },
			}}
		>
			<HeaderMenu disclosure={[opened, handlers]} />
			<AppShellMain>{children}</AppShellMain>
		</AppShell>
	);
}
