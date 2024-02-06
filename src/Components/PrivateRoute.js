import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  return userInfo?.username !== null ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
