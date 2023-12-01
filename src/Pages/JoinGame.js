import "../Styles/JoinGame.css";
import cross from "../Images/close.png";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

export default function JoinGame() {
  const [lobbyName, setLobbyName] = useState("");
  const [lobbyPassword, setLobbyPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [inputClass, setInputClass] = useState("notErrorDivJoin");
  const { userInfo } = useContext(UserContext);

  const handleCloseClick = () => {
    setErrorMsg(null);
    setInputClass("notErrorDivJoin");
  };

  const handleCloseClickSuccess = () => {
    setSuccessMsg(null);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://server.sheetstorm.co.uk/join-lobby", {
      method: "POST",
      body: JSON.stringify({
        username: userInfo.username,
        lobbyName,
        lobbyPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        var msg =
          "'" +
          lobbyName.slice(0, 1).toUpperCase() +
          lobbyName.slice(1) +
          "' joined successfully!";
        setSuccessMsg(msg);
        setLobbyName("");
        setLobbyPassword("");
        handleCloseClick();
      });
    } else {
      var msg =
        "Failed to join '" +
        lobbyName.slice(0, 1).toUpperCase() +
        lobbyName.slice(1).toLowerCase() +
        "'";
      setErrorMsg(msg);
      setInputClass("errorDivJoin");
    }
  }

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

        {successMsg && (
          <div className="successContainerJoin">
            {successMsg}
            <div className="closeDiv">
              <img
                src={cross}
                alt="closeImg"
                onClick={handleCloseClickSuccess}
              ></img>
            </div>
          </div>
        )}

        <div className="lobbyInputButtonContainer">
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </div>
    </>
  );
}
