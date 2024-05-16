import type { Metadata } from "next";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider, Center } from "@mantine/core";
import ArrierePlan from "@/img/ArrierePlan.png";

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
				<body
					className="bg-center min-h-[100dvh] bg-[size:10%] backdrop-blur-[1.5px] "
					style={{ backgroundImage: `url("${ArrierePlan.src}")` }}
				>
					<MantineProvider>
						<Center className="min-h-[100dvh]">{children}</Center>
					</MantineProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
