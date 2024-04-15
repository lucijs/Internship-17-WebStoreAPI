import { createContext, useContext, useState } from "react";

const defaultContext = {
  token: "",
  isAdmin: false,
  isLogedIn: false,
  login: () => {},
  logout: () => {}
};

const AuthorizationBearerContext = createContext(defaultContext);

const AuthorizationBearerProvider = ({ children, secretKey}) => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (newToken) => {
    setIsLogedIn(true);
    setToken(newToken);
  };

  const logout = () => {
    setToken("");
    setIsLogedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthorizationBearerContext.Provider value={{ token, isAdmin, isLogedIn, login, logout }}>
      {children}
    </AuthorizationBearerContext.Provider>
  );
};

export const useAuthorizationBearer = () => useContext(AuthorizationBearerContext);

export default AuthorizationBearerProvider;
