"use client";

import {
	Category,
	DrawingUtils,
	FilesetResolver,
	GestureRecognizer,
	GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const modelePath: string = `${process.cwd()}modeles/gesture_recognizer.task`;
const mediapipeWasmPath: string =
	"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

type CameraProps = {
	setResultat: Dispatch<SetStateAction<Category | undefined>>;
};

/**
 * Système de caméra qui détecte avec MediaPipe les gestes du modèle à travers la webcam.
 * 
 * Pour le faire fonctionner, fournir le *setter* d'un *state* qui stocke un `Category`.
 * 
 * Exemple :
 * ```ts
 * export default function TestCamera() {
 * 	const [resultat, setResultat] = useState<Category>();
 *		return (
 *			<>
 *				<p className="text-center text-xl p-2">
 *					{resultat?.categoryName}
 *					<br />
 *					{Math.round((resultat?.score || 0) * 100)} %
 *				</p>
 *				<Camera setResultat={setResultat} />
 *			</>
 *		);
 * }
```
 * 
 * @param props.setResultat Setter de State (`useState<Category>`) qui stocke le résultat de la reconnaissance de signe
 * @returns
 */
export default function Camera({ setResultat }: CameraProps) {
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
	}, []);

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

	// Webcam avec canvas qui la recouvre + messages de chargement
	return (
		<div className="flex flex-col items-center">
			<Webcam
				ref={webcamRef}
				className="object-center"
				videoConstraints={{ facingMode: "user" }}
				onLoadedDataCapture={() => setIsCameraPrete(true)}
			/>
			{!isCameraPrete && <p className="text-xl">Chargement de la caméra 🫠</p>}
			{!isModelePret && <p className="text-xl">Chargement du modèle 🫠</p>}
			<canvas ref={canvasRef} className="absolute object-cover" />
		</div>
	);
}
