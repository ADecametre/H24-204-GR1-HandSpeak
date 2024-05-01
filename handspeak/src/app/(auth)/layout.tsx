import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";

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
		<ClerkProvider>
			<html lang="en">
				<head></head>
				<body>
					<MantineProvider>{children}</MantineProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
