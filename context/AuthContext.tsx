import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on startup
    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                    const decodedUser = jwtDecode(storedToken);
                    setUser(decodedUser?.sub);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Failed to load auth token', error);
            } finally {
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    const login = async (userToken) => {
        try {
            await AsyncStorage.setItem('userToken', userToken);
            const decodedUser = jwtDecode(userToken);

            // console.log(decodedUser);

            setToken(userToken);
            setUser(decodedUser?.sub);
            setIsLoggedIn(true)

        } catch (error) {
            console.error('Failed to save auth token', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setToken(null);
            setUser(null);
            setIsLoggedIn(false)
        } catch (error) {
            console.error('Failed to remove auth token', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
