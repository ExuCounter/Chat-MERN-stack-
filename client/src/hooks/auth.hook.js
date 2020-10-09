import { useState, useEffect } from 'react';

export const useAuth = () => {
    const storageName = 'userData';
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tokenLoading, setTokenLoading] = useState(true);

    const login = (jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(storageName, JSON.stringify({ token: jwtToken, userId: id }));
        setTokenLoading(false);
    }

    const logout = () => {

    }

    useEffect(() => {
        let storageData = JSON.parse(localStorage.getItem(storageName));
        if (storageData && storageData.token) {
            login(storageData.token, storageData.userId);
        }
        setTokenLoading(false);
    }, [])

    return { login, token, userId, logout, tokenLoading };
}