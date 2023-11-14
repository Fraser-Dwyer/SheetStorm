import "../Styles/Signup.css";

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
        Already have an account? <span>Click here</span>
      </div>
    </div>
  );
}
