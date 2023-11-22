import Home from "./Pages/Home.js";
import Login from "./Pages/Login.js";
import Signup from "./Pages/Signup.js";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext.js";
import Layout from "./Components/Layout.js";
import EnterScore from "./Pages/EnterScore.js";
import CreateGame from "./Pages/CreateGame.js";
import MyGames from "./Pages/MyGames.js";
import ManageLobby from "./Pages/ManageLobby.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-score" element={<EnterScore />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/my-games" element={<MyGames />} />
          <Route path="/manage-games" element={<ManageLobby />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
