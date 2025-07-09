import React, { useState, createContext } from "react";
export const AuthContext = React.createContext({
  loggenIn: false,
  token: "",
  setloggenIn: () => {},
});

const AuthContextProvider = (props) => {
  let [loggenIn, setloggenIn] = useState(false);
  let [token, setToken] = useState(localStorage.getItem("token"));

  let updateToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  let UpdateStatus = (status) => {
    setloggenIn(status);
    localStorage.setItem("loggenIn", status);
  };

  return (
    <AuthContext.Provider
      value={{
        loggenIn: loggenIn,
        token: token,
        UpdateStatus: UpdateStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
