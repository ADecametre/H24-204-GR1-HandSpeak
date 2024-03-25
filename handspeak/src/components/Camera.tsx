"use client";

import { Loader } from "@mantine/core";
import {
	Category,
	DrawingUtils,
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const mediapipeWasmPath: string =
	"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

type CameraProps = {
	modelePath: string;
	setResultat: Dispatch<SetStateAction<Category | undefined>>;
	className?: string;
};

/**
 * Système de caméra qui détecte avec MediaPipe les gestes d'un modèle à travers la webcam.
 *
 * @param {string} props.modelePath Path (chemin d'accès) du fichier `.task` du modèle d'IA
 * @param {Dispatch<SetStateAction<any>>} props.setResultat Setter de State (`useState<Category>`) qui stocke le résultat de la reconnaissance de signe
 * @param {string} [props.className] Classes CSS pour styliser le `<div>` du composant
 *
 * @example
 * ```ts
 * 	const [resultat, setResultat] = useState<Category>();
 * 	return (
 * 		<>
 * 			{resultat?.categoryName} - {Math.round((resultat?.score || 0) * 100)} %
 * 			<Camera
 * 				modelePath={`${process.cwd()}modeles/gesture_recognizer.task`}
 * 				setResultat={setResultat}
 * 			/>
 * 		</>
 * 	);
 * ```
 */
export default function Camera({
	modelePath,
	setResultat,
	className,
}: CameraProps) {
	// Refs pour la webcam et le canvas (permettent d'accéder aux éléments HTML)
	const webcamRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// State pour stocker si la caméra et le modèle sont prêts (s'ils ont fini de charger)
	const [isCameraPrete, setIsCameraPrete] = useState(false);
	const [isModelePret, setIsModelePret] = useState(false);

	// GestureRecognizer de MediaPipe
	const detecteurDeGestes = useRef<GestureRecognizer>();

	// Initialisation du détecteur de gestes (exécuté une seule fois)
	useEffect(() => {
		async function initialiser() {
			setIsModelePret(false);
			const vision = await FilesetResolver.forVisionTasks(mediapipeWasmPath);
			detecteurDeGestes.current = await GestureRecognizer.createFromOptions(
				vision,
				{
					baseOptions: {
						modelAssetPath: modelePath,
						delegate: "GPU",
					},
					runningMode: "VIDEO",
				}
			);
		}
		initialiser().then(() => {
			setIsModelePret(true);
		});
	}, [modelePath]);

	// Détection des gestes et traitement des résultats (exécuté quand la caméra et le modèle chargent)
	useEffect(() => {
		// Vérification que la webcam et le modèle sont prêts (ont fini de charger)
		if (!isCameraPrete || !isModelePret) return;

		const video = webcamRef.current!.video!; // <video />

		// Détection des gestes sur la webcam (pour chaque frame)
		let lastVideoTime = -1;
		function analyserWebcam(): void {
			if (video.currentTime !== lastVideoTime) {
				const gestureRecognitionResult =
					detecteurDeGestes.current!.recognizeForVideo(video, Date.now());
				lastVideoTime = video.currentTime;
				afficherResultat(gestureRecognitionResult);
			}
			requestAnimationFrame(() => {
				analyserWebcam();
			});
		}

		// Traitement des résultats
		const canvas = canvasRef.current!; // <canvas />
		const canvasCtx = canvas?.getContext("2d")!;
		const drawingUtils = new DrawingUtils(canvas?.getContext("2d")!);
		function afficherResultat(resultats: GestureRecognizerResult) {
			// Renvoi du résultat au composant parent avec setResultat (qui vient du parent)
			if (resultats.gestures[0]) {
				setResultat(resultats.gestures[0][0]);
			} else {
				setResultat(undefined);
			}

			// Dessin des mains sur le canvas qui couvre la caméra
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
			for (const landmarks of resultats.landmarks) {
				drawingUtils.drawConnectors(
					landmarks,
					GestureRecognizer.HAND_CONNECTIONS,
					{ color: "#00FF00", lineWidth: 5 }
				);
				drawingUtils.drawLandmarks(landmarks, {
					color: "#FF0000",
					lineWidth: 2,
				});
			}
		}
		analyserWebcam();
	}, [isCameraPrete, isModelePret, setResultat]);

	// Interface
	return (
		<div className={`flex flex-col relative items-stretch ${className}`}>
			{/* Webcam */}
			<Webcam
				ref={webcamRef}
				className="object-fill w-full h-full"
				videoConstraints={{ facingMode: "user" }}
				onLoadedDataCapture={() => setIsCameraPrete(true)}
			/>
			{/* Animation de chargement */}
			<div
				className={`flex flex-col items-center justify-center absolute w-full h-full text-center bg-blue-950/75 transition-opacity duration-500 ${
					isCameraPrete && isModelePret && "opacity-0"
				}`}
			>
				<Loader color="blue" size="xl" type="dots" />
				<p
					className={`text-3xl transition-opacity duration-300 ${
						isCameraPrete && "opacity-0"
					}`}
				>
					Chargement de la caméra…
				</p>
				<p
					className={`text-3xl transition-opacity duration-300 ${
						isModelePret && "opacity-0"
					}`}
				>
					Chargement du modèle…
				</p>
			</div>
			{/* Canvas pour le traçage des mains */}
			<canvas
				ref={canvasRef}
				className={`absolute object-fill w-full h-full`}
			/>
		</div>
	);
}
