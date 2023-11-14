import Home from "../src/Components/Home.js";
import Login from "../src/Components/Login.js";
import Signup from "../src/Components/Signup.js";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Home />
          </main>
        }
      />
      <Route
        path="/login"
        element={
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          ></Login>
        }
      />
      <Route
        path="/signup"
        element={
          <Signup
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            name={name}
            setName={setName}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
          ></Signup>
        }
      />
    </Routes>
  );
}

export default App;
