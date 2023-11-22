import "../Styles/ManageLobby.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function ManageLobby(props) {
  const [allLobbies, setAllLobies] = useState(null);
  const [userCreatedLobbies, setUserCreatedLobbies] = useState([]);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const username = userInfo.username;

  useEffect(() => {
    fetch("http://localhost:4000/check-lobby").then((response) => {
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
  }, []);

  const listPlayers = ["Fraser", "George", "Michael"];

  return (
    <div>
      <h3>Manage Games</h3>
      {userCreatedLobbies.length === 0 && (
        <p>You have not yet created any lobbies.</p>
      )}
      {userCreatedLobbies.length > 0 &&
        userCreatedLobbies.map((lobby) => (
          <>
            <div className="manageLobbyContainer">
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
                <button>Delete</button>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
