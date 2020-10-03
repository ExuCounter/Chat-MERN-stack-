import { createContext } from 'react';

function empty() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: null,
    logout: null,
    isAuthenticated: false
})