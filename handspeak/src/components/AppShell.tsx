"use client";

import { useDisclosure } from "@mantine/hooks";
import { AppShell, AppShellMain } from "@mantine/core";
import HeaderMenu from "./HeaderMenu";
import NextTopLoader from "nextjs-toploader";

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
			<NextTopLoader
				showSpinner={false}
				crawlSpeed={300}
				easing="cubic-bezier(.23,.01,.38,.99)"
				initialPosition={0.3}
				speed={300}
			/>
			<AppShellMain>{children}</AppShellMain>
		</AppShell>
	);
}
