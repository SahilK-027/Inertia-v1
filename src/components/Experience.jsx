import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "../stores/useGame";

// Rest of your Experience component remains unchanged
export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  return (
    <>
      <Physics debug={false}>
        <Lights />
        <Level obstacleCount={blocksCount} />
        <Player />
      </Physics>
    </>
  );
}


