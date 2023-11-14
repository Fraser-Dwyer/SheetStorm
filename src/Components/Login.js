import "../Styles/Login.css";

export default function Login({
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <div className="main">
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
          <button>Submit</button>
        </div>
      </div>
      <div className="signupMessage">
        Don't have an account? <span>Click here</span>
      </div>
    </div>
  );
}