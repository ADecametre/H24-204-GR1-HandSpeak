import { Prisma, PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const prismaClientSingleton = () => {
	return new PrismaClient().$extends({
		model: {
			users: {
				async getCurrentUser() {
					"use server";

					// Obtenir l'utilisateur connecté avec Clerk
					const clerkUser = await currentUser();
					if (!clerkUser) return null;

					// Essayer de trouver l'utilisateur Clerk sur MongoDB
					const context = Prisma.getExtensionContext(this);
					for (let attempts = 0; attempts < 5; attempts++) {
						// Requête MongoDB
						let user = await context.findUnique({
							where: { clerkId: clerkUser.id },
						});
						// Retourner l'utilisateur s'il existe
						if (user) return user;
						// Sinon, attendre une seconde
						await new Promise((resolve) => setTimeout(resolve, 1000));
					}
					// Après 5 échecs, rediriger vers la page /sign-up
					redirect("/sign-up");
				},
			},
		},
	});
};

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
