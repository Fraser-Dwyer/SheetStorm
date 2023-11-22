import "../Styles/JoinGame.css";
import cross from "../Images/close.png";
import { useState } from "react";

export default function JoinGame() {
  const [lobbyName, setLobbyName] = useState("");
  const [lobbyPassword, setLobbyPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputClass, setInputClass] = useState("notErrorDivJoin");

  const handleCloseClick = () => {
    setErrorMsg(null);
    setInputClass("notErrorDivJoin");
  };

  return (
    <>
      <h3>Join Game</h3>
      <div className="lobbyInputContainer">
        <form>
          <div>
            <label>Lobby name</label>
            <input
              className={inputClass}
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Lobby password</label>
            <input
              className={inputClass}
              value={lobbyPassword}
              onChange={(e) => setLobbyPassword(e.target.value)}
            ></input>
          </div>
        </form>

        {errorMsg && (
          <div className="errorContainerJoin">
            {errorMsg}
            <div className="closeDiv">
              <img src={cross} alt="closeImg" onClick={handleCloseClick}></img>
            </div>
          </div>
        )}

        <div className="lobbyInputButtonContainer">
          <button>Submit</button>
        </div>
      </div>
    </>
  );
}
