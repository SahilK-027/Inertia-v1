import Lights from "./Lights";
import Level from "./Level";
import { Physics } from "@react-three/rapier";

// Rest of your Experience component remains unchanged
export default function Experience() {
  return (
    <>
      <Lights />
      <Physics debug>
        <Level obstacleCount={5}/>
      </Physics>
    </>
  );
}
