import "../Styles/CreateGame.css";
import { useContext, useState } from "react";
import cross from "../Images/close.png";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMsg, setErrorMsg] = useState("Lobby name already exists.");
  const [lobbyDiv, setLobbyDiv] = useState("notErrorLobbyDiv");
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleCreateLobby(e) {
    e.preventDefault();
    const password = makeid(5);
    const username = userInfo.username;

    const response = await fetch("http://localhost:4000/create-lobby", {
      method: "POST",
      body: JSON.stringify({
        username,
        lobbyName,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        navigate("/");
      });
    } else {
      alert("Score was not submitted successfully");
    }
  }

  const handleCloseClick = () => {
    setErrorMsg(null);
    setLobbyDiv("notErrorLobbyDiv");
  };

  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div>
      <h3>Create Game</h3>
      <p className="labelCreateGame">Name of the lobby:</p>
      <form className="createGameForm">
        <div>
          <input
            className={lobbyDiv}
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
          ></input>
          <button onClick={(e) => handleCreateLobby(e)}>Create</button>
        </div>
      </form>
      {errorMsg && (
        <div className="errorContainerInGame">
          {errorMsg}
          <div className="closeDiv">
            <img src={cross} alt="closeImg" onClick={handleCloseClick}></img>
          </div>
        </div>
      )}
    </div>
  );
}