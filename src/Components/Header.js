import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import bolt from "../Images/bolt.png";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function handleLogout() {
    const response = fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
      <div className="leftHeaderDiv">
        {userInfo && (
          <>
            <h1>SHEET STORM</h1>
            <img src={bolt} alt="lightening bolt"></img>
          </>
        )}
      </div>

      <nav>
        {userInfo && <a onClick={handleLogout}>Logout</a>}
        {false && !userInfo && (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
