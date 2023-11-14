import "../Styles/Signup.css";
import sheetStormLogo from "../Images/sheetStormLogo4.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="main">
      <div className="logo">
        <img src={sheetStormLogo} alt="SheetStormLogo"></img>
      </div>
      <div className="signupContainer">
        <div className="inputTitle">
          <h1>Sign Up</h1>
        </div>
        <form>
          <div>
            <label for="username">First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label for="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label for="repeatPassword">Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="buttonContainer">
          <button onClick={handleSignup}>Submit</button>
        </div>
      </div>
      <div className="signupMessage">
        Already have an account? <Link to="/login">Click here</Link>
      </div>
    </div>
  );
}
