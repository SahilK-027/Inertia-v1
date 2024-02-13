import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";

// Rest of your Experience component remains unchanged
export default function Experience() {
  return (
    <>
      <Physics debug={false}>
        <Lights />
        <Level obstacleCount={5} />
        <Player />
      </Physics>
    </>
  );
}
