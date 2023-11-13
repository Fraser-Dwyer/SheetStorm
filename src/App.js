import "./App.css";
import sheetStormLogo from "../src/Images/sheetStormLogo3.png";
import Header from "./Components/Header";
import Login from "./Components/Login";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      {false && <Header></Header>}
      <div className="logo">
        <img src={sheetStormLogo} alt="SheetStormLogo"></img>
      </div>
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      ></Login>
    </main>
  );
}

export default App;
