import { useCallback, useEffect, useState } from "react";


let logoutTimer;

export const useauth = () => {
    const [token, setToken] = useState(null);
    const [tokenExpDate, setTokenExpDate] = useState();
    const [userId, setUserId] = useState(null);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        const tokenExpDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpDate(tokenExpDate);
        localStorage.setItem(
            'user',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpDate.toISOString()
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpDate(null);
        setUserId(null);
        localStorage.removeItem('user');
    }, []);

    useEffect(() => {
        if (token && tokenExpDate) {
            const remainingTime = tokenExpDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpDate])
    
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login]);

    return { token, login, logout, userId };
}