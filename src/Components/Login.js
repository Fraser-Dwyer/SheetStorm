import "../App.css";

export default function Login(props) {
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
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="buttonContainer">
          <button>Submit</button>
        </div>
      </div>
      <div className="message">
        Already have an account? <span>Click here</span>
      </div>
    </div>
  );
}
