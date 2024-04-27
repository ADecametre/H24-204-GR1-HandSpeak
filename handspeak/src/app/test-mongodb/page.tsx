import db from "@/lib/db";

async function getPlanetes() {
	"use server";
	return await db.planets.findMany({ orderBy: { orderFromSun: "asc" } });
}

export const revalidate = 30; // Rafraîchir les données à chaque 30 secondes.
// Cette ligne n'a aucun effet en développement, mais est essentielle en production pour que les données soient mises à jour par Next.js.

export default async function TestMongoDB() {
	let planetes = await getPlanetes();

	return (
		<main className="p-2">
			<h1 className="text-center text-3xl p-2">Planètes</h1>
			<div className="grid grid-cols-2">
				{planetes.map((planete) => (
					<div key={planete.id} className="border-2 p-2 rounded-lg">
						<center className="text-center text-lg font-bold">
							{planete.name}
						</center>
						<p>
							<u>Ordre à partir du soleil :</u>{" "}
							{planete.orderFromSun.toString()}
						</p>
						<p>
							<u>Anneaux :</u> {planete.hasRings ? "Oui" : "Non"}
						</p>
						<p>
							<u>Composition de l&apos;atmosphère :</u>{" "}
							{planete.mainAtmosphere.join(", ")}
						</p>
						<p>
							<u>Température (°C) :</u> {planete.surfaceTemperatureC.toString()}
						</p>
					</div>
				))}
			</div>
		</main>
	);
}
