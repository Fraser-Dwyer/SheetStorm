import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Styles/Header.css";
import bolt from "../Images/bolt.png";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    fetch("https://server.sheetstorm.co.uk/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  async function handleLogout(e) {
    e.preventDefault();
    const response = await fetch("https://server.sheetstorm.co.uk/logout", {
      credentials: "include",
      method: "POST",
    });
    if (response.ok) {
      setUserInfo(null);
      navigate("/login");
    }
  }

  const username = userInfo?.username;
  return (
    <header>
      <nav>
        <div className="navButtonContainer">
          {(path === "/post-score" ||
            path === "/create-game" ||
            path === "/my-games" ||
            path === "/manage-games" ||
            path === "/join-game") && <a onClick={() => navigate("/")}>Back</a>}
          {path === "/" && <a onClick={() => navigate("/")}></a>}
          {userInfo && <a onClick={(e) => handleLogout(e)}>Logout</a>}
        </div>
        {!userInfo && path === "/login" && (
          <div className="logRegButtonContainerLog">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        {!userInfo && path === "/signup" && (
          <div className="logRegButtonContainerReg">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>

      <div className="leftHeaderDiv">
        {userInfo && (
          <>
            <img src={bolt} alt="lightening bolt"></img>
            <h1>SHEET STORM</h1>
            <img src={bolt} alt="lightening bolt"></img>
          </>
        )}
      </div>
    </header>
  );
}
