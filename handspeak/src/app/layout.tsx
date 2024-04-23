import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			signInFallbackRedirectUrl="/"
			signUpForceRedirectUrl="/onboarding"
		>
			<html lang="en">
				<head>
					<ColorSchemeScript />
				</head>
				<body className={inter.className}>
					<MantineProvider theme={createTheme({})}>{children}</MantineProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
