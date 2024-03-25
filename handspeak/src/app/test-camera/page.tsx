"use client";

import Camera from "@/components/Camera";
import { Category } from "@mediapipe/tasks-vision";
import { useState } from "react";

export default function TestCamera() {
	const [resultat, setResultat] = useState<Category>();
	return (
		<div className="flex flex-col gap-2 items-center">
			<p className="text-center text-xl p-2">
				{resultat?.categoryName}
				<br />
				{Math.round((resultat?.score || 0) * 100)} %
			</p>
			<Camera
				modelePath={`${process.cwd()}modeles/gesture_recognizer.task`}
				setResultat={setResultat}
				className="min-w-[60dvw] min-h-[45dvw] border-2 border-blue-100"
			/>
		</div>
	);
}
