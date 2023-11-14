import Home from "../src/Components/Home.js";
import Login from "../src/Components/Login.js";
import Signup from "../src/Components/Signup.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Home />
          </main>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
