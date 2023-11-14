import "../Styles/Signup.css";
import sheetStormLogo from "../Images/sheetStormLogo4.png";
import { Link } from "react-router-dom";

export default function Signup({
  username,
  password,
  setUsername,
  setPassword,
  name,
  setName,
  repeatPassword,
  setRepeatPassword,
}) {
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
          <button>Submit</button>
        </div>
      </div>
      <div className="signupMessage">
        Already have an account? <Link to="/login">Click here</Link>
      </div>
    </div>
  );
}
