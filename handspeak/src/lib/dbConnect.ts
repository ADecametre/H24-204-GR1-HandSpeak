import mongoose from "mongoose";
declare global {
	var mongoose: any; // This must be a `var` and not a `let / const`
}

const databaseName = "sample_guides";
const MONGODB_URI = `${process.env
	.MONGODB_URI!}/${databaseName}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
	throw new Error(
		"Veuillez inclure dans le dossier handspeak le fichier .env.local fourni par ADecametre"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
