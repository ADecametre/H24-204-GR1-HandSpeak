import dbConnect from "@/lib/dbConnect";
import planet, { Planet } from "@/models/planet";

async function getPlanetes() {
	"use server";
	await dbConnect();

	// await planet.create({ name: "Pluto" });
	return await planet.find({}).sort("orderFromSun");
}

export default function TestMongoDB() {
	let planetes = getPlanetes();

	return (
		<main className="p-2">
			<h1 className="text-center text-3xl p-2">Planètes</h1>
			<div className="grid grid-cols-2">
				{planetes.then((res) =>
					res.map((planete: Planet) => (
						<div key={planete._id} className="border-2 p-2 rounded-lg">
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
								<u>Température (°C) :</u>{" "}
								{planete.surfaceTemperatureC.toString()}
							</p>
						</div>
					))
				)}
			</div>
		</main>
	);
}
