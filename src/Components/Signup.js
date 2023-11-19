import "../Styles/Signup.css";
import sheetStormLogo from "../Images/sheetStormLogo4.png";
import cross from "../Images/close.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [allUsers, setAllUsers] = useState(null);

  const [nameDiv, setNameDiv] = useState("notErrorDiv");
  const [usernameDiv, setUserNameDiv] = useState("notErrorDiv");
  const [passwordDiv, setPasswordDiv] = useState("notErrorDiv");
  const [repeatPasswordDiv, setRepeatPasswordDiv] = useState("notErrorDiv");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/check-user").then((response) => {
      response.json().then((users) => {
        console.log(users);
        setAllUsers(users);
      });
    });
  }, []);

  const handleCloseClick = () => {
    setErrorMsg(null);
    setNameDiv("notErrorDiv");
    setUserNameDiv("notErrorDiv");
    setPasswordDiv("notErrorDiv");
    setRepeatPasswordDiv("notErrorDiv");
  };

  async function handleSignup(e) {
    e.preventDefault();
    /*
    setNameDiv("notErrorDiv");
    setUserNameDiv("notErrorDiv");
    setPasswordDiv("notErrorDiv");
    setRepeatPasswordDiv("notErrorDiv");

    if (
      name.length === 0 ||
      username.length === 0 ||
      password.length === 0 ||
      repeatPassword.length === 0
    ) {
      if (name.length === 0) {
        setNameDiv("errorDiv");
      }
      if (username.length === 0) {
        setUserNameDiv("errorDiv");
      }
      if (password.length === 0) {
        setPasswordDiv("errorDiv");
      }
      if (repeatPassword.length === 0) {
        setRepeatPasswordDiv("errorDiv");
      }
      setErrorMsg("Please fill in all fields");
      return;
    }*/

    // Check username not already taken
    if (allUsers && allUsers.length > 0) {
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username.toLowerCase() === username.toLowerCase()) {
          setErrorMsg("Username already taken");
          setUserNameDiv("errorDiv");
          return;
        }
      }
    }

    // If made it here, then make new user
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ name, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      navigate("/login");
    } else {
      console.log(response);
    }
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
            <label for="name">First Name</label>
            <input
              className={nameDiv}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label for="username">Username</label>
            <input
              className={usernameDiv}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              className={passwordDiv}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label for="repeatPassword">Repeat Password</label>
            <input
              className={repeatPasswordDiv}
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </form>

        {errorMsg && (
          <div className="errorContainer">
            {errorMsg}
            <div className="closeDiv">
              <img src={cross} alt="closeImg" onClick={handleCloseClick}></img>
            </div>
          </div>
        )}

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
