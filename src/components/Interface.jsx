import React from "react";
import { useKeyboardControls } from "@react-three/drei";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  console.log(forward, backward, leftward, rightward);
  return (
    <>
      <div className="interFace">
        <div className="time">0.00</div>
        <div className="win">You Win</div>

        <div className="restart">
          <button className="restartButton">Play Again!</button>
        </div>

        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-up"></i>
            </div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-left"></i>
            </div>
            <div className={`key ${backward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <div className={`key ${rightward ? "active" : ""}`}>
              <i className="fa-solid fa-caret-right"></i>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Interface;
