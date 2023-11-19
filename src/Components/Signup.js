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

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  var weekStart = new Date();
  weekStart.setDate(
    weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
  );
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  useEffect(() => {
    fetch("http://localhost:4000/check-user").then((response) => {
      response.json().then((users) => {
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

    // Reset error divs
    setNameDiv("notErrorDiv");
    setUserNameDiv("notErrorDiv");
    setPasswordDiv("notErrorDiv");
    setRepeatPasswordDiv("notErrorDiv");

    // Check no fields are empty
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
    }

    // Check length of name
    if (name.length < 2) {
      setNameDiv("errorDiv");
      setErrorMsg("Name cannot be singular character");
      return;
    }

    // Check passwords match
    if (password !== repeatPassword) {
      setPasswordDiv("errorDiv");
      setRepeatPasswordDiv("errorDiv");
      setErrorMsg("Passwords do not match");
      return;
    }

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

    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);

    // If made it here, then make new user
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ name: pascalName, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Make an entry for the user's scores
      const secondResponse = await fetch("http://localhost:4000/make-scores", {
        method: "POST",
        body: JSON.stringify({ username, weekStart }),
        headers: { "Content-Type": "application/json" },
      });

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
