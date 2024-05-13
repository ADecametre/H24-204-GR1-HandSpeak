import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef } from "react";
import { Group } from "three";

const Scene = ({ letter }: { letter: string }) => {
  const handRef = useRef<Group | null>(null!);
  const stl: any = useLoader(GLTFLoader, `/mains/${letter}.gltf`);

  useFrame(() => {
    if (handRef.current) {
      handRef.current.rotateY(0.01);
    }
  });

  return (
    <primitive
      ref={handRef}
      object={stl.scene}
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
    cameraRef.current.setLookAt(0, 0, 30, 0, 0, 0);
  }

  return (
    <Canvas>
      <Suspense fallback={null}>
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