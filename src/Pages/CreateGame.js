import "../Styles/CreateGame.css";
import { useContext, useState, useEffect } from "react";
import cross from "../Images/close.png";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateGame({ baseURL }) {
  const [lobbyName, setLobbyName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [lobbyDiv, setLobbyDiv] = useState("notErrorLobbyDiv");
  const [allLobbies, setAllLobies] = useState(null);
  const { userInfo, setCreateLobbyMsg } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseURL + "/check-lobby").then((response) => {
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

    // Check if lobbyName empty
    if (lobbyName.length === 0) {
      setErrorMsg("Lobby name cannot be empty");
      setLobbyDiv("errorLobbyDiv");
      return;
    }

    // Check length of lobbyname (MAX 10 chars)
    if (lobbyName.length > 10) {
      setErrorMsg("Lobby name too long \n(10 characters maximum)");
      setLobbyDiv("errorLobbyDiv");
      return;
    }

    var lobbyNameLower = lobbyName.toLowerCase();
    const response = await fetch(baseURL + "/create-lobby", {
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
        navigate("/manage-games");
        setCreateLobbyMsg(msg);
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
    <div className="createGameContainerContainer">
      <div>
        <h3 className="creatGamehthree">Create Game</h3>
        <div className="createGameContainer">
          <p className="labelCreateGame">Name of the lobby:</p>
          <form className="createGameForm">
            <div>
              <input
                className={lobbyDiv}
                value={lobbyName}
                onChange={(e) => setLobbyName(e.target.value)}
              ></input>
            </div>
          </form>

          {errorMsg && (
            <div className="errorContainerInGame">
              {errorMsg}
              <div className="closeDiv">
                <img
                  src={cross}
                  alt="closeImg"
                  onClick={handleCloseClick}
                ></img>
              </div>
            </div>
          )}

          <div className="brokenButContainer">
            <button onClick={(e) => handleCreateLobby(e)}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
