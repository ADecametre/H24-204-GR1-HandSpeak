import { Prisma, PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prismaClientSingleton = () => {
	return new PrismaClient().$extends({
		model: {
			users: {
				async getCurrentUser() {
					"use server";
					const user = await currentUser();
					if (!user) return null;
					const context = Prisma.getExtensionContext(this);
					return context.findUnique({
						where: { clerkId: user.id },
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
