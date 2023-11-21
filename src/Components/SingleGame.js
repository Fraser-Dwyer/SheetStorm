import arrow from "../Images/right-arrow.png";
import { useState } from "react";

export default function SingleGame({ lobby }) {
  const [expanded, setExpanded] = useState(false);
  const rotate = expanded ? "rotate(90deg)" : "rotate(0)";

  const handleImgClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="outerContainer">
      <div className="myGamesContainer">
        <img
          src={arrow}
          alt="arrowImg"
          style={{ transform: rotate, transition: "all 0.2s linear" }}
          onClick={handleImgClick}
        />
        <p>{lobby.lobbyName}</p>
      </div>
      {expanded && <p>Hello world</p>}
    </div>
  );
}
