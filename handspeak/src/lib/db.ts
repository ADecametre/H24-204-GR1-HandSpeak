import { Prisma, PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const prismaClientSingleton = () => {
	type updateUtilisateurType = Omit<
		Omit<Prisma.usersUpdateArgs, "where">,
		"include"
	>;

	return new PrismaClient()
		.$extends({
			model: {
				users: {
					async getUtilisateur() {
						// Obtenir l'utilisateur connecté avec Clerk
						const clerkUser = await currentUser();
						if (!clerkUser) redirect("/sign-in");

						// Essayer de trouver l'utilisateur Clerk sur MongoDB
						const context = Prisma.getExtensionContext(this);
						for (let attempts = 0; attempts < 5; attempts++) {
							// Requête MongoDB
							let user = await context.findUnique({
								where: { clerkId: clerkUser.id },
								include: {
									progressions: {
										include: { course: { include: { category: true } } },
									},
								},
							});
							// Retourner l'utilisateur s'il existe
							if (user) return user;
							// Sinon, attendre une seconde
							await new Promise((resolve) => setTimeout(resolve, 1000));
						}
						// Après 5 échecs, rediriger vers la page /sign-up
						redirect("/sign-up");
					},
					async updateUtilisateur(
						args:
							| updateUtilisateurType
							| ((userId: string) => updateUtilisateurType)
					) {
						const user = await this.getUtilisateur();
						const context = Prisma.getExtensionContext(this);

						context.update({
							where: {
								id: user.id,
							},
							include: {
								progressions: {
									include: { course: { include: { category: true } } },
								},
							},
							...("data" in args ? args : args(user.id)),
						});
					},
					async enregistrerProgressionUtilisateur(
						data: Omit<Prisma.progressionsCreateWithoutUserInput, "id">
					) {
						return this.updateUtilisateur((userId) => ({
							data: {
								progressions: {
									upsert: {
										where: {
											userId_courseId: {
												userId: userId,
												courseId: data.course.connect!.id!,
											},
										},
										update: data,
										create: data,
									},
								},
							},
						}));
					},
				},
			},
		})
		.$extends({
			model: {
				categories: {
					async getCategoriesCoursEtProgressionUtilisateur() {
						const context = Prisma.getExtensionContext(this);
						const user = await context.$parent.users.getUtilisateur();

						return context.findMany({
							include: {
								courses: {
									include: {
										progressions: { where: { userId: user!.id } },
									},
								},
							},
						});
					},
				},
				courses: {
					async getCoursParURL(url: string) {
						const context = Prisma.getExtensionContext(this);
						const user = await context.$parent.users.getUtilisateur();

						return context.findUnique({
							where: { url },
							include: {
								category: true,
								progressions: { where: { userId: user.id } },
							},
						});
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
