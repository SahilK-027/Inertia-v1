import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const Player = () => {
  const { scene } = useGLTF("models/car.glb");
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  return (
    <>
      {/* Load and display the car model */}
      <primitive 
      position={[0, 0, 0]} 
      object={scene} 
      scale={0.5} 
      rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
};

export default Player;
