import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser } from "@/lib/actions/user.action";

/**
 * À chaque fois qu'un utilisateur est créé ou supprimé sur Clerk, cette route API est appelée pour mettre à jour la base de données MongoDB.
 * @param req Requête
 * @returns Réponse
 */
export async function POST(req: Request) {
	let evt: WebhookEvent;
	try {
		evt = await validationWebhook(req);
	} catch (error) {
		return new Response((error as Error).message);
	}

	const { id } = evt.data;

	switch (evt.type) {
		case "user.created":
			try {
				const newUser = await createUser(id!);
				return new Response(JSON.stringify(newUser), {
					status: 200,
					statusText: "Nouvel utilisateur créé avec succès :)",
				});
			} catch (error) {
				console.error(evt.data.id + " " + error);
				return new Response("", {
					status: 500,
					statusText:
						"Une erreur s'est produite lors de la création d'un nouvel utilisateur",
				});
			}
		case "user.deleted":
			try {
				await deleteUser(id!);
				return new Response("", {
					status: 200,
					statusText: "Utilisateur supprimé avec succès :)",
				});
			} catch (error) {
				console.error(evt.data.id, error);
				return new Response("", {
					status: 500,
					statusText:
						"Une erreur s'est produite lors de la suppression de l'utilisateur",
				});
			}
	}

	return new Response("", { status: 200 });
}

/**
 * Validation de sécurité pour s'assurer que la requête provient réellement de Clerk
 * @param req Requête
 * @returns {WebhookEvent} Un objet de type `WebhookEvent`, qui contient toutes les données envoyées par Clerk
 */
async function validationWebhook(req: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
	if (!WEBHOOK_SECRET) {
		throw new Error("CLERK_WEBHOOK_SECRET introuvable.");
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		throw new Error("No Svix headers");
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	// Verify the payload with the headers
	try {
		return wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Erreur lors de la validation du webhook", err);
		throw new Error("Une erreur s'est produite.");
	}
}
