"use client";

import Camera from "@/components/Camera";
import { Category } from "@mediapipe/tasks-vision";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function TestCamera() {
	const [resultat, setResultat] = useState<Category>();
	return (
		<>
			<p className="text-center text-xl p-2">
				{resultat?.categoryName}
				<br />
				{Math.round((resultat?.score || 0) * 100)} %
			</p>
			<Camera setResultat={setResultat} />
		</>
	);
}
