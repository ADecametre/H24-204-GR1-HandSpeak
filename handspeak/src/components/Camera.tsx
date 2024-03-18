"use client";

import {
	DrawingUtils,
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";

const objetParDefaut = {
	score: 0,
	index: 0,
	categoryName: "None",
	displayName: "",
};

export default function Camera() {
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [resultat, setResultat] = useState(objetParDefaut);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;
		let vision, gestureRecognizer: GestureRecognizer;
		async function initialiser() {
			vision = await FilesetResolver.forVisionTasks(
				"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
			);
			gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
				baseOptions: {
					modelAssetPath: `${process.cwd()}modeles/gesture_recognizer.task`,
					delegate: "GPU",
				},
				runningMode: "VIDEO",
			});
		}
		initialiser().then(analyser);

		const video = webcamRef.current!.video!;
		let lastVideoTime = -1;
		function analyser(): void {
			if (video.currentTime !== lastVideoTime) {
				const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(
					video,
					Date.now()
				);
				lastVideoTime = video.currentTime;
				afficherResultat(gestureRecognitionResult);
			}
			requestAnimationFrame(() => {
				analyser();
			});
		}

		const canvas = canvasRef.current!;
		const canvasCtx = canvas.getContext("2d")!;
		const drawingUtils = new DrawingUtils(canvas.getContext("2d")!);
		function afficherResultat(results: GestureRecognizerResult) {
			if (results.gestures[0]) {
				setResultat(results.gestures[0][0]);
			} else {
				setResultat(objetParDefaut);
			}

			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			for (const landmarks of results.landmarks) {
				drawingUtils.drawConnectors(
					landmarks,
					GestureRecognizer.HAND_CONNECTIONS,
					{
						color: "#00FF00",
						lineWidth: 5,
					}
				);
				drawingUtils.drawLandmarks(landmarks, {
					color: "#FF0000",
					lineWidth: 2,
				});
			}
		}
	}, [isLoading]);

	return (
		<>
			<p className="text-center text-xl p-2">
				{resultat.categoryName}
				<br />
				{Math.round(resultat.score * 100)} %
			</p>
			<div className="flex flex-col items-center">
				<Webcam
					ref={webcamRef}
					className="object-center"
					videoConstraints={{ facingMode: "user" }}
					onLoadStart={() => setIsLoading(false)}
				/>
				{isLoading && <p className="text-xl">Chargement en cours 🫠</p>}
				<canvas ref={canvasRef} className="absolute object-cover" />
			</div>
		</>
	);
}
