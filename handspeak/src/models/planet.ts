import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface Planet extends Document {
	// _id: ObjectId;
	name: String;
	orderFromSun: Number;
	hasRings: Boolean;
	mainAtmosphere: [String];
	surfaceTemperatureC: {
		max: Number;
		min: Number;
		mean: Number;
	};
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const PlanetSchema = new Schema<Planet>({
	/* _id: {
		type: Object,
	}, */
	name: {
		type: String,
		required: [true, "Veuillez indiquer un nom de planète"],
	},
	orderFromSun: {
		type: Number,
	},
	hasRings: {
		type: Boolean,
	},
	mainAtmosphere: {
		type: [String],
	},
	surfaceTemperatureC: {
		min: {
			type: Number,
		},
		max: {
			type: Number,
		},
		mean: {
			type: Number,
		},
	},
});

export default mongoose.models.Planet ||
	mongoose.model<Planet>("Planet", PlanetSchema);
