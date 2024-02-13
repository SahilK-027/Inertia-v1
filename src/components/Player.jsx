import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef } from "react";

const Player = () => {
  const { scene } = useGLTF("models/car.glb");
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };

    const velocity = 8;
    const impulseStrength = velocity * delta;

    if (forward === true) {
      impulse.z -= impulseStrength;
    }

    if (backward === true) {
      impulse.z += impulseStrength;
    }

    if (rightward === true && forward === true) {
      impulse.x += impulseStrength;
    }

    if (leftward === true && forward === true) {
      impulse.x -= impulseStrength;
    }

    if (rightward === true && backward === true) {
      impulse.x += impulseStrength;
    }

    if (leftward === true && backward === true) {
      impulse.x -= impulseStrength;
    }

    body.current.applyImpulse(impulse);
  });

  return (
    <>
      <RigidBody
        position={[0, 1, 0]}
        colliders="hull"
        restitution={0.2}
        friction={1}
        canSleep={false}
        ref={body}
        mass={1000}
      >
        <primitive
          position={[0, 0, 0]}
          object={scene}
          scale={0.5}
          rotation={[0, Math.PI / 2, 0]}
        />
      </RigidBody>
    </>
  );
};

export default Player;
