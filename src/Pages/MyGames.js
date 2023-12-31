import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "../Styles/MyGames.css";
import SingleGame from "../Components/SingleGame";
import cross from "../Images/close.png";
import { useNavigate } from "react-router-dom";

export default function MyGames({ baseURL }) {
  const { userInfo, joinLobbyMsg, setJoinLobbyMsg } = useContext(UserContext);
  const username = userInfo.username;
  const [inLobbies, setInLobbies] = useState(null);
  const [allScores, setAllScores] = useState(null);
  const [leave, setLeave] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseURL + "/check-lobby").then((response) => {
      response.json().then((lobbies) => {
        var userInLobbies = [];
        if (lobbies.length > 0) {
          for (let i = 0; i < lobbies.length; i++) {
            for (let j = 0; j < lobbies[i].players.length; j++) {
              if (lobbies[i].players[j].username === username) {
                userInLobbies.push(lobbies[i]);
              }
            }
          }
          const reversedUserInLobbies = userInLobbies.reverse();
          setInLobbies(reversedUserInLobbies);

          if (joinLobbyMsg !== "") {
            setSuccessMsg(joinLobbyMsg);
          }
        }
      });
    });

    fetch(baseURL + "/get-scores").then((response) => {
      response.json().then((allScores) => {
        let tempArr = allScores.map((item) => {
          var total = 0;
          if (item.Mon && item.Mon !== "-") {
            total = total + 7 - item.Mon;
          }
          if (item.Tue && item.Tue !== "-") {
            total = total + 7 - item.Tue;
          }
          if (item.Wed && item.Wed !== "-") {
            total = total + 7 - item.Wed;
          }
          if (item.Thu && item.Thu !== "-") {
            total = total + 7 - item.Thu;
          }
          if (item.Fri && item.Fri !== "-") {
            total = total + 7 - item.Fri;
          }
          if (item.Sat && item.Sat !== "-") {
            total = total + 7 - item.Sat;
          }
          if (item.Sun && item.Sun !== "-") {
            total = total + 7 - item.Sun;
          }
          return { ...item, total: total };
        });
        setAllScores(tempArr);
      });
    });
  }, [leave, userInfo, username, joinLobbyMsg]);

  async function handleLeaveLobby(e, lobbyName) {
    e.preventDefault();
    const response = await fetch(baseURL + "/leave-lobby", {
      method: "POST",
      body: JSON.stringify({
        lobbyName,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        var msg =
          "Successfully left '" +
          lobbyName.slice(0, 1).toUpperCase() +
          lobbyName.slice(1) +
          "'";
        setSuccessMsg(msg);
        setJoinLobbyMsg("");
        setLeave(!leave);
      });
    } else {
      setErrorMsg("Failed to leave game");
    }
  }

  const handleCloseClickSuccess = () => {
    setSuccessMsg(null);
    setJoinLobbyMsg("");
  };

  const handleCloseClickFail = () => {
    setErrorMsg(null);
  };

  return (
    <div className="myGamesContainerContainer">
      <div className="smallThingy">
        <h3>My Games</h3>
        {(!inLobbies || inLobbies?.length === 0) && (
          <div className="msgThingy">
            <p>You are not yet in any games.</p>
            <p>
              To join a game, go to{" "}
              <a onClick={() => navigate("/join-game")}>Join Game</a>
            </p>
          </div>
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

        {inLobbies?.length > 0 && (
          <div className="myGamesScoreTableContainer">
            {allScores &&
              inLobbies.map((lobby) => (
                <SingleGame
                  key={lobby.lobbyName}
                  lobbyName={lobby.lobbyName}
                  allScores={allScores}
                  players={lobby.players}
                  handleLeaveLobby={(e) => handleLeaveLobby(e, lobby.lobbyName)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
