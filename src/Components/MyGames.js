import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "../Styles/MyGames.css";

import SingleGame from "./SingleGame";

export default function MyGames() {
  const { userInfo } = useContext(UserContext);
  const username = userInfo.username;
  const [inLobbies, setInLobbies] = useState([]);
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/check-lobby").then((response) => {
      response.json().then((lobbies) => {
        var userInLobbies = [];
        if (lobbies.length > 0) {
          for (let i = 0; i < lobbies.length; i++) {
            for (let j = 0; j < lobbies[i].players.length; j++) {
              if (lobbies[i].players[j] === username) {
                userInLobbies.push(lobbies[i]);
              }
            }
          }
          setInLobbies(userInLobbies);
        }
      });
    });

    fetch("http://localhost:4000/get-scores").then((response) => {
      response.json().then((allScores) => {
        setAllScores(allScores);
      });
    });
  }, []);

  return (
    <div>
      {inLobbies.length > 0 && (
        <>
          <h3>My Games</h3>
          {inLobbies.map((lobby) => (
            <SingleGame
              lobbyName={lobby.lobbyName}
              allScores={allScores}
              players={lobby.players}
            />
          ))}
        </>
      )}
    </div>
  );
}
