import type { Metadata } from "next";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import AppShell from "../components/AppShell";

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
			</head>
			<body>
				<MantineProvider theme={createTheme({})}>
					<AppShell>{children}</AppShell>
				</MantineProvider>
			</body>
		</html>
	);
}
