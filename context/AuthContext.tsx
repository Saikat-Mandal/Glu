import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: any;
    token: string | null;
    login: (token: string, user: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("jwtToken");
            const storedUser = await SecureStore.getItemAsync("user");

            if (storedToken) {
                setToken(storedToken);
                // setUser(JSON.parse(storedUser!));
                setUser(storedUser);
            }
        };

        loadToken();
    }, []);


    // login 
    const login = async (jwt: string, userData: any) => {
        await SecureStore.setItemAsync("jwtToken", jwt);
        // await SecureStore.setItemAsync("user", JSON.stringify(userData));
        await SecureStore.setItemAsync("user", userData.firstName);
        setToken(jwt);
        setUser(userData.firstName);
    };

    // logout 
    const logout = async () => {
        await SecureStore.deleteItemAsync("jwtToken");
        await SecureStore.deleteItemAsync("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);