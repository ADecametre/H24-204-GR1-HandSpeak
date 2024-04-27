import { SignIn, ClerkProvider } from "@clerk/nextjs";

export default function Page() {
	return (
		<ClerkProvider>
			<SignIn />
		</ClerkProvider>
	);
}
