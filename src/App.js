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
import About from "./Pages/About.js";
import FAQs from "./Pages/FAQs.js";

function App() {
  // Production:  "https://server.sheetstorm.co.uk"
  // Development: "http://localhost:8000"
  const baseURL = "https://server.sheetstorm.co.uk";
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout baseURL={baseURL} />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home baseURL={baseURL} />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login baseURL={baseURL} />} />
          <Route path="/signup" element={<Signup baseURL={baseURL} />} />
          <Route path="/about" element={<About />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route
            path="/post-score"
            element={
              <PrivateRoute>
                <EnterScore baseURL={baseURL} />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-game"
            element={
              <PrivateRoute>
                <CreateGame baseURL={baseURL} />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-games"
            element={
              <PrivateRoute>
                <MyGames baseURL={baseURL} />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-games"
            element={
              <PrivateRoute>
                <ManageLobby baseURL={baseURL} />
              </PrivateRoute>
            }
          />
          <Route
            path="/join-game"
            element={
              <PrivateRoute>
                <JoinGame baseURL={baseURL} />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
