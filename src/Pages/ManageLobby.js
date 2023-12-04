import "../Styles/ManageLobby.css";
import cross from "../Images/close.png";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function ManageLobby(props) {
  const [allLobbies, setAllLobies] = useState(null);
  const [userCreatedLobbies, setUserCreatedLobbies] = useState([]);
  const { userInfo } = useContext(UserContext);
  const username = userInfo.username;
  const [deleting, setDeleting] = useState(true);
  const [sure, setSure] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/check-lobby").then((response) => {
      response.json().then((lobbies) => {
        setAllLobies(lobbies);
        var userMadeLobbies = [];
        if (lobbies.length > 0) {
          for (let i = 0; i < lobbies.length; i++) {
            if (lobbies[i].creator === username) {
              userMadeLobbies.push(lobbies[i]);
            }
          }
        }
        setUserCreatedLobbies(userMadeLobbies);
      });
    });
  }, [deleting]);

  function handleConfirmDeleteLobby(e, lobbyName) {
    e.preventDefault();
    setSure(lobbyName);
  }

  const handleCloseClickSuccess = () => {
    setSuccessMsg(null);
  };

  const handleCloseClickFail = () => {
    setErrorMsg(null);
  };

  async function handleDeleteLobby(e, lobbyName) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/delete-lobby", {
      method: "POST",
      body: JSON.stringify({
        lobbyName,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        var msg =
          "Successfully deleted '" +
          lobbyName.slice(0, 1).toUpperCase() +
          lobbyName.slice(1) +
          "'";
        setSuccessMsg(msg);
        setDeleting(!deleting);
      });
    } else {
      setErrorMsg("Failed to delete game");
    }
  }

  return (
    <div>
      <h3>Manage Games</h3>
      {userCreatedLobbies.length === 0 && (
        <p>You have not yet created any lobbies.</p>
      )}

      {successMsg && (
        <div className="successContainerJoinDelete">
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

      {errorMsg && (
        <div className="errorContainerDelete">
          {errorMsg}
          <div className="closeDiv">
            <img
              src={cross}
              alt="closeImg"
              onClick={handleCloseClickFail}
            ></img>
          </div>
        </div>
      )}

      {userCreatedLobbies.length > 0 &&
        userCreatedLobbies.map((lobby) => (
          <>
            <div className="manageLobbyContainer">
              <div className="flexLobbyContainer">
                <div className="leftContent">
                  <div className="infoContainer">
                    <p>Lobby:</p>
                    <p>
                      {lobby.lobbyName.slice(0, 1).toUpperCase()}
                      {lobby.lobbyName.slice(1)}
                    </p>
                  </div>
                  <div className="infoContainer">
                    <p>Password:</p>
                    <p>{lobby.password}</p>
                  </div>
                  <div className="infoContainer">
                    <p>Players:</p>
                    <p>{lobby.players.length}</p>
                  </div>
                </div>
                <div className="rightContent">
                  <button
                    onClick={(e) => {
                      handleConfirmDeleteLobby(e, lobby.lobbyName);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {sure && sure === lobby.lobbyName && (
                <div className="areYouSure">
                  <p>
                    Delete {lobby.lobbyName.slice(0, 1).toUpperCase()}
                    {lobby.lobbyName.slice(1).toLowerCase()}?
                  </p>
                  <div>
                    <button
                      onClick={(e) => handleDeleteLobby(e, lobby.lobbyName)}
                    >
                      Delete
                    </button>
                    <button onClick={() => setSure(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
    </div>
  );
}
