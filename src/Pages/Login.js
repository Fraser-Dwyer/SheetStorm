import "../Styles/Login.css";
import sheetStormLogo from "../Images/sheetstorm-logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Error from "../Components/Error";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginClass, setLoginClass] = useState("notErrorDiv");
  const [errorMsg, setErrorMsg] = useState(null);

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

  async function handleLogin(e) {
    e.preventDefault();
    var usernameLower = username.toLowerCase();
    const response = await fetch("https://server.sheetstorm.co.uk/login", {
      method: "POST",
      body: JSON.stringify({ username: usernameLower, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      /*
      // Make an entry for the user's scores
      const secondResponse = await fetch("http://localhost:8000/make-scores", {
        method: "POST",
        body: JSON.stringify({ username, weekStart }),
        headers: { "Content-Type": "application/json" },
      });
      */
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/");
      });
    } else {
      setLoginClass("errorDiv");
      setErrorMsg("Invalid login credentials");
    }
  }

  const handleCloseClick = () => {
    setErrorMsg(null);
    setLoginClass("notErrorDiv");
  };

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
            <input
              className={loginClass}
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className={loginClass}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>

        <Error errorMsg={errorMsg} handleCloseClick={handleCloseClick} />

        <div className="buttonContainer">
          <button onClick={(e) => handleLogin(e)}>Submit</button>
        </div>
      </div>
      <div className="signupMessage">
        Don't have an account? <Link to="/signup">Click here</Link>
      </div>
    </div>
  );
}
