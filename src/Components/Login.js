import "../Styles/Login.css";
import sheetStormLogo from "../Images/sheetStormLogo4.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/");
      });
    } else {
      alert("Invalid login credentials");
    }
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
