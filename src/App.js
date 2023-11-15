import Home from "../src/Components/Home.js";
import Login from "../src/Components/Login.js";
import Signup from "../src/Components/Signup.js";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext.js";
import Layout from "./Components/Layout.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
