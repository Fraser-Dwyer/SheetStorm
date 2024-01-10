import "../Styles/Signup.css";
import sheetStormLogo from "../Images/sheetstorm-logo2.png";
import sheetStormLogoNoRoll from "../Images/logoNoRoll.png";
import Error from "../Components/Error";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Icon from "../Components/Icon";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Signup({ baseURL }) {
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
  if (weekStart.getDay() !== 1) {
    weekStart.setDate(
      weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
    );
  }
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  useEffect(() => {
    fetch(baseURL + "/check-user").then((response) => {
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

    // Check length of username
    if (username.length > 6) {
      setUserNameDiv("errorDiv");
      setErrorMsg("Username too long \n6 characters maximum");
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
    const lowerUsername = username.toLowerCase();

    // If made it here, then make new user
    const response = await fetch(baseURL + "/signup", {
      method: "POST",
      body: JSON.stringify({
        name: pascalName,
        username: lowerUsername,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      navigate("/login");
    } else {
      console.log(response);
    }
  }

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <div className="mainContainer">
      <div className="logo">
        {isSmallDevice && <img src={sheetStormLogo} alt="SheetStormLogo"></img>}
        {!isSmallDevice && (
          <>
            <img src={sheetStormLogoNoRoll} alt="SheetStormLogo"></img>
            <Icon />
          </>
        )}
      </div>

      <div className="main">
        <div className="signupContainer">
          <div className="inputTitle">
            <h1>Sign Up</h1>
          </div>
          <form>
            <div>
              <input
                className={nameDiv}
                placeholder="First Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                className={usernameDiv}
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className={passwordDiv}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                className={repeatPasswordDiv}
                placeholder="Repeat Password"
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
          </form>

          <Error errorMsg={errorMsg} handleCloseClick={handleCloseClick} />

          <div className="buttonContainer">
            <button onClick={handleSignup}>Submit</button>
          </div>
        </div>
        <div className="signupMessage">
          Already have an account? <Link to="/login">Click here</Link>
        </div>
      </div>
    </div>
  );
}
