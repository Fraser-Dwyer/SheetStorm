import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import sheetstormlogo2 from "../Images/sheetstormtitleoneline.png";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  async function handleLogout(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });
    if (response.ok) {
      setUserInfo(null);
      navigate("/login");
    }
  }

  return (
    <header>
      <nav>
        <div className="navButtonContainer">
          {(path === "/post-score" ||
            path === "/create-game" ||
            path === "/my-games" ||
            path === "/manage-games" ||
            path === "/join-game") && ( // eslint-disable-next-line
            <a onClick={() => navigate("/")}>Back</a>
          )}
          {path === "/" && ( // eslint-disable-next-line
            <a onClick={() => navigate("/")}></a>
          )}
          {userInfo?.username !== undefined && (
            // eslint-disable-next-line
            <a onClick={(e) => handleLogout(e)}>Logout</a>
          )}
        </div>
        {userInfo?.username === undefined && path === "/login" && (
          <div className="logRegButtonContainerLog">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {userInfo?.username === undefined && path === "/signup" && (
          <div className="logRegButtonContainerReg">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>

      {userInfo?.username !== undefined && (
        <div className="leftHeaderDiv">
          <div className="titleContainerLogos">
            <img src={sheetstormlogo2} alt="lightening bolt"></img>
          </div>
        </div>
      )}
    </header>
  );
}
