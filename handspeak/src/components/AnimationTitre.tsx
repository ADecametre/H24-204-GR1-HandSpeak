"use client";

import { TypeAnimation } from "react-type-animation";
export default function AnimationTitre() {
	return (
		<TypeAnimation
			sequence={[
				"HANDSPEAK",
				//3000, // Waits 3000ms
			]}
			wrapper="span"
			cursor={true}
			repeat={1}
			className="min-w-40 inline-block"
		/>
	);
}
