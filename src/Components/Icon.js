import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

const ICON = require("../Images/wired-lineal-1714-toilet-paper.json");

export default function PlayOnce() {
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const mouseOver = () => {
    if (!playerRef.current.isPlaying) {
      playerRef.current.playFromBeginning();
    }
  };

  return (
    <>
      <div onClick={mouseOver} className="iconDiv">
        <Player ref={playerRef} icon={ICON} size={105} />
      </div>
    </>
  );
}
