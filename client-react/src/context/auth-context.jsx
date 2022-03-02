import React, { useState } from 'react';

export const AuthContext = React.createContext({
    auth: {},
    setAuth: () => {},
    logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [ auth, setAuthState ] = useState({
        token: sessionStorage.getItem('token'),
        email: sessionStorage.getItem('email')
    });

    const setAuth = (email, token) => {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('token', token);

        setAuthState({ email, token });
    };

    const logout = () => {
        sessionStorage.clear();
        setAuthState({
            token: '',
            email: '',
        });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            { children }
        </AuthContext.Provider>
    );
};
