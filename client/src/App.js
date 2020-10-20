import React, { useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import { useAuth } from "../src/hooks/auth.hook";
import { useHttp } from "../src/hooks/http.hook";

function App() {
  const { request } = useHttp();
  const { login, logout, token, userId, tokenLoading } = useAuth();
  let isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, tokenLoading);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
        tokenLoading,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
