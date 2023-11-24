import "../Styles/CreateGame.css";
import { useContext, useState, useEffect } from "react";
import cross from "../Images/close.png";
import { UserContext } from "../UserContext";

export default function CreateGame() {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [lobbyDiv, setLobbyDiv] = useState("notErrorLobbyDiv");
  const [allLobbies, setAllLobies] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/check-lobby").then((response) => {
      response.json().then((lobbies) => {
        setAllLobies(lobbies);
      });
    });
  }, []);

  async function handleCreateLobby(e) {
    e.preventDefault();
    const password = makeid(5);
    const username = userInfo.username;

    // Check if lobby name already exists
    if (allLobbies && allLobbies.length > 0) {
      for (let i = 0; i < allLobbies.length; i++) {
        if (allLobbies[i].lobbyName.toLowerCase() === lobbyName.toLowerCase()) {
          setErrorMsg("Lobby already exists");
          setLobbyDiv("errorLobbyDiv");
          return;
        }
      }
    }

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
        var msg =
          "'" +
          lobbyName.slice(0, 1).toUpperCase() +
          lobbyName.slice(1) +
          "' created successfully!";
        setSuccessMsg(msg);
        setLobbyName("");
        handleCloseClick();
      });
    } else {
      setErrorMsg("Failed to create lobby");
      setLobbyDiv("errorLobbyDiv");
    }
  }

  const handleCloseClick = () => {
    setErrorMsg(null);
    setLobbyName("");
    setLobbyDiv("notErrorLobbyDiv");
  };

  const handleCloseClickSuccess = () => {
    setSuccessMsg(null);
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
      <div className="createGameContainer">
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
        {successMsg && (
          <div className="successContainerCreate">
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
      </div>
    </div>
  );
}
