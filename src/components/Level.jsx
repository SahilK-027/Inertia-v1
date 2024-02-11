import React from "react";

const BlockStart = () => {
  const blockHeight = 0.2, blockSize = 4;
  return (
    <>
      {/* Floor */}
      <mesh receiveShadow position={[0, -1 * (blockHeight / 2), 0]}>
        <boxGeometry args={[blockSize, blockHeight, blockSize]} />
        <meshStandardMaterial color="limegreen" />
      </mesh>
    </>
  );
};

const Level = () => {
  return (
    <>
      <BlockStart />
    </>
  );
};

export default Level;
