import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [createLobbyMsg, setCreateLobbyMsg] = useState("");
  const [joinLobbyMsg, setJoinLobbyMsg] = useState("");
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        createLobbyMsg,
        setCreateLobbyMsg,
        joinLobbyMsg,
        setJoinLobbyMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
