import React from 'react';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthContext} from '../src/context/AuthContext';
import {useAuth} from '../src/hooks/auth.hook';

function App() {
  const {login, logout, token, userId, tokenLoading} = useAuth();
  let isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, tokenLoading);
  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated, tokenLoading
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
