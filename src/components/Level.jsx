import React, { useEffect } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

const BlockStart = ({ positionProp = [0, 0, 0] }) => {
  const blockHeight = 0.2,
    blockSize = 4;
  return (
    <group position={positionProp}>
      <mesh
        geometry={boxGeometry}
        receiveShadow
        position={[0, -1 * (blockHeight / 2), 0]}
        scale={[blockSize, blockHeight, blockSize]}
        material={floor1Material}
      ></mesh>
    </group>
  );
};

const BlockEnd = ({ positionProp = [0, 0, 0] }) => {
  const { scene } = useGLTF("models/treasure.glb");
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const blockHeight = 0.2,
    blockSize = 4;
  return (
    <group position={positionProp}>
      <mesh
        geometry={boxGeometry}
        receiveShadow
        position={[0, 0, 0]}
        scale={[blockSize, blockHeight, blockSize]}
        material={floor1Material}
      ></mesh>
      <RigidBody 
        type="fixed" colliders="hull" 
        restitution={0.2} friction={0}
      >
        <primitive 
          position={[0, 0, 0]} 
          object={scene} 
          scale={0.025} 
        />
      </RigidBody>
    </group>
  );
};

const BlockObstacle = ({ positionProp = [0, 0, 0], obstaclePosition }) => {
  const blockHeight = 0.2,
    blockSize = 4;
  return (
    <group position={positionProp}>
      <mesh
        geometry={boxGeometry}
        receiveShadow
        position={[0, -1 * (blockHeight / 2), 0]}
        scale={[blockSize, blockHeight, blockSize]}
        material={floor2Material}
      ></mesh>

      <RigidBody
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
        position={
          obstaclePosition === "left" ? [-1.25, 0.75, 0] : [1.25, 0.75, 0]
        }
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        ></mesh>
      </RigidBody>
    </group>
  );
};

const Level = () => {
  const zAxisShift = 4;
  return (
    <>
      <BlockStart positionProp={[0, 0, zAxisShift * 4]} />
      <BlockObstacle
        positionProp={[0, 0, zAxisShift * 3]}
        obstaclePosition={"right"}
      />
      <BlockObstacle
        positionProp={[0, 0, zAxisShift * 2]}
        obstaclePosition={"left"}
      />
      <BlockObstacle
        positionProp={[0, 0, zAxisShift * 1]}
        obstaclePosition={"right"}
      />
      <BlockEnd positionProp={[0, 0, zAxisShift * 0]} />
    </>
  );
};

export default Level;
