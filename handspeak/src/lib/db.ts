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
										orderBy: { course: { order: "asc" } },
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

						return context.update({
							where: {
								id: user.id,
							},
							include: {
								progressions: {
									include: { course: { include: { category: true } } },
									orderBy: { course: { order: "asc" } },
								},
							},
							...("data" in args ? args : args(user.id)),
						});
					},
					/**
					 * Met à jour la progression de l'utilisateur connecté sur un cours précis
					 * @param data Objet contenant les données à enregistrer
					 * @example
					 * ```ts
					 *	db.users.setProgressionUtilisateur({
					 *		courseId: cours.id,
					 *		grade: 0.99,
					 *		lessonsDone: 7,
					 *	});
					 * ```
					 */
					async setProgressionUtilisateur(
						data: Omit<Prisma.progressionsUncheckedCreateWithoutUserInput, "id">
					) {
						return this.updateUtilisateur((userId) => ({
							data: {
								progressions: {
									upsert: {
										where: {
											userId_courseId: {
												userId: userId,
												courseId: data.courseId,
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
					/**
					 * @returns Liste des catégories de cours, qui contiennent chacune une liste de cours, qui contiennent chacun la progression de l'utilisateur connecté
					 * @example
					 * ```ts
					 * 	export default async function Cours() {
					 *		const categories =
					 *			await db.categories.getListeCours();
					 *
					 *		return (
					 *			<>
					 *				<Title order={1} mb="md">
					 *					Liste des cours disponibles
					 *				</Title>
					 *				{categories.map((category) => (
					 *					<section key={category.id}>
					 *						<Title order={2}>{category.name}</Title>
					 *						<Group>
					 *							{category.courses.map((course) => (
					 *								<Card key={course.id}>
					 *									<Title order={3}>{course.name}</Title>
					 *									<Text>
					 *										{course.progressions[0]?.lessonsDone || 0}/
					 *										{course.lessons.length}
					 *									</Text>
					 *									<Text>{course.progressions[0]?.grade * 100 || 0} %</Text>
					 *								</Card>
					 *							))}
					 *						</Group>
					 *					</section>
					 *				))}
					 *			</>
					 *		);
					 *	}
					 * ```
					 */
					async getListeCours() {
						const context = Prisma.getExtensionContext(this);
						const user = await context.$parent.users.getUtilisateur();

						return context.findMany({
							include: {
								courses: {
									include: {
										progressions: { where: { userId: user!.id } },
									},
									orderBy: { order: "asc" },
								},
							},
							orderBy: { order: "asc" },
						});
					},
				},
				courses: {
					/**
					 * @param url URL param _(ex.: pour la page `/cours/lettres-a-f`, `"lettres-a-f"`)_
					 * @returns Informations sur le cours, ainsi que sur la progression et la catégorie
					 * @example
					 * ```ts
					 * const cours = await db.courses.getCoursParURL("lettres-a-f");
					 * if (!cours) redirect("/cours");
					 * const progression = cours.progressions[0],
					 * 	categorie = cours.category;
					 * ```
					 */
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
