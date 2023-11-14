import sheetStormLogo from "../Images/sheetStormLogo4.png";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <div>
      {false && <Header></Header>}
      <div className="logo">
        <img src={sheetStormLogo} alt="SheetStormLogo"></img>
      </div>
      {false && (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        ></Login>
      )}
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
    </div>
  );
}
