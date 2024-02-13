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

    const impulseStrength = 1 * delta;

    if (forward === true) {
      impulse.z -= impulseStrength;
    }

    if (backward === true) {
      impulse.z += impulseStrength;
    }

    body.current.applyImpulse(impulse);
  });

  return (
    <>
      <RigidBody
        position={[0, 1, 0]}
        colliders="ball"
        restitution={0.2}
        friction={1}
        canSleep={false}
        ref={body}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
