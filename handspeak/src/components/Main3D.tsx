import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { CameraControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useMemo, useRef } from "react";
import { Group } from "three";
import {
	ColorSchemeScript,
	MantineProvider,
	Center,
	Loader,
} from "@mantine/core";

const Scene = ({ letter }: { letter: string }) => {
	const handRef = useRef<Group | null>(null!);
	const stl: any = useLoader(GLTFLoader, `/mains/${letter}.gltf`);
	const copiedScene = useMemo(() => stl.scene.clone(), [stl]);

	useFrame(() => {
		if (handRef.current) {
			handRef.current.rotateY(0.01);
		}
	});

	return (
		<primitive
			ref={handRef}
			object={copiedScene}
			scale={0.3}
			position={[0, 0, 0]}
			dispose={null}
		/>
	);
};

export default function Main3D({ letter }: any) {
	const cameraRef = useRef<CameraControls | null>(null!);

	function initLocAndRot() {
		if (!cameraRef.current) return;
		cameraRef.current.setLookAt(0, 0, 40, 0, 0, 0);
	}

	return (
		<Canvas className="object-fill aspect-square" style={{ height: "" }}>
			<Suspense
				fallback={
					<Html className="w-full h-full">
						<ColorSchemeScript />
						<MantineProvider>
							<Center h="100%" w="100%">
								<Loader color="blue" size="xl" type="dots" />
							</Center>
						</MantineProvider>
					</Html>
				}
			>
				<Scene letter={letter} />
				<CameraControls
					ref={(ref) => {
						cameraRef.current = ref;
						if (ref) {
							initLocAndRot();
						}
					}}
				/>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[0, 30, -30]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={Math.PI}
				/>
				<pointLight position={[30, 0, 30]} decay={0} intensity={Math.PI} />
				<pointLight position={[-30, 0, -30]} decay={0} intensity={Math.PI} />
				<pointLight position={[30, 0, -30]} decay={0} intensity={Math.PI} />
				<pointLight position={[-30, 0, 30]} decay={0} intensity={Math.PI} />
			</Suspense>
		</Canvas>
	);
}
