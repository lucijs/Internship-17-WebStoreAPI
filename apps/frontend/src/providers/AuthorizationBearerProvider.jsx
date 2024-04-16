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

  const login = (newToken, id) => {
    setIsLogedIn(true);
    setToken(newToken);
    console.log("ID before conversion:", id);
    const user = fetchUser(newToken, Number(id)); 
  };

  const fetchUser = async (newToken, id)=>{
    console.log(token);
    await fetch(`/api/users/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      }
    })
    .then((res)=>res.json())
    .then((json)=>{
      console.log(json)
      setIsAdmin(json.isAdmin);
    })
  }

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
