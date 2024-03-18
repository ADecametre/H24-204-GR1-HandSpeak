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
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const webcamRef = useRef<Webcam>(null);
	// const canvasRef = useRef<HTMLCanvasElement>(null);

	const [resultat, setResultat] = useState(objetParDefaut);

	useEffect(() => {
		if (webcamRef.current) {
			videoRef.current = webcamRef.current.video;
		}
	}, [webcamRef]);

	useEffect(() => {
		let vision, gestureRecognizer: GestureRecognizer;
		async function initialiser() {
			vision = await FilesetResolver.forVisionTasks(
				"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
			);
			gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
				baseOptions: {
					modelAssetPath:
						"https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
					delegate: "GPU",
				},
				runningMode: "VIDEO",
			});
		}
		initialiser().then(analyser);

		let lastVideoTime = -1;
		function analyser(): void {
			const video = videoRef.current!;
			if (video.currentTime !== lastVideoTime) {
				const gestureRecognitionResult = gestureRecognizer?.recognizeForVideo(
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

		// const drawingUtils = new DrawingUtils(canvasRef.current!.getContext("2d"));
		function afficherResultat(results: GestureRecognizerResult) {
			/* for (const landmarks of results.landmarks) {
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
            } */
			if (results.gestures[0]) {
				setResultat(results.gestures[0][0]);
			} else {
				setResultat(objetParDefaut);
			}
		}
	}, []);

	return (
		<div className="flex flex-col items-center">
			<p className="text-center text-xl p-2">
				{resultat.categoryName}
				<br />
				{Math.round(resultat.score * 100)} %
			</p>
			<Webcam ref={webcamRef}className="object-center" />
			{/* <canvas ref={canvasRef} /> */}
		</div>
	);
}
