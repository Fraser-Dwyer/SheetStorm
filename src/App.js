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
import JoinGame from "./Pages/JoinGame.js";
import PrivateRoute from "./Components/PrivateRoute.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/post-score"
            element={
              <PrivateRoute>
                <EnterScore />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-game"
            element={
              <PrivateRoute>
                <CreateGame />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-games"
            element={
              <PrivateRoute>
                <MyGames />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-games"
            element={
              <PrivateRoute>
                <ManageLobby />
              </PrivateRoute>
            }
          />
          <Route
            path="/join-game"
            element={
              <PrivateRoute>
                <JoinGame />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
