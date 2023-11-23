import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "../Styles/MyGames.css";
import SingleGame from "../Components/SingleGame";

export default function MyGames() {
  const { userInfo } = useContext(UserContext);
  const username = userInfo.username;
  const [inLobbies, setInLobbies] = useState(null);
  const [allScores, setAllScores] = useState(null);
  const [leave, setLeave] = useState(true);

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
  }, [leave]);

  async function handleLeaveLobby(e, lobbyName) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/leave-lobby", {
      method: "POST",
      body: JSON.stringify({
        lobbyName,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        console.log("Successfully left lobby");
        setLeave(!leave);
      });
    } else {
      console.log("Failed to leave lobby");
    }
  }

  return (
    <div>
      {inLobbies?.length > 0 && (
        <>
          <h3>My Games</h3>
          {allScores &&
            inLobbies.map((lobby) => (
              <SingleGame
                lobbyName={lobby.lobbyName}
                allScores={allScores}
                players={lobby.players}
                handleLeaveLobby={(e) => handleLeaveLobby(e, lobby.lobbyName)}
              />
            ))}
        </>
      )}
    </div>
  );
}
