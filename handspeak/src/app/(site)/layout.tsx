import type { Metadata } from "next";
import "@/app/globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
	title: "HandSpeak",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
				/>
			</head>
			<body>
				<MantineProvider theme={createTheme({})}>
					<AppShell>{children}</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
