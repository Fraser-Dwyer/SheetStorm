import "../Styles/Login.css";
import sheetStormLogo from "../Images/sheetStormLogo4.png";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Invalid login credentials");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main">
      <div className="logo">
        <img src={sheetStormLogo} alt="SheetStormLogo"></img>
      </div>
      <div className="loginContainer">
        <div className="inputTitle">
          <h1>Login</h1>
        </div>
        <form>
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
        </form>
        <div className="buttonContainer">
          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
      <div className="signupMessage">
        Don't have an account? <Link to="/signup">Click here</Link>
      </div>
    </div>
  );
}
