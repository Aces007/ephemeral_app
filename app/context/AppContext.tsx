import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    email?: string;
} | null;

type AppContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, remember?: boolean) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, remember = false) => {
        if (remember) {
            await AsyncStorage.setItem("savedEmail", email);
            await AsyncStorage.setItem("savedPassword", password);
        } else {
            await AsyncStorage.removeItem("savedEmail");
            await AsyncStorage.removeItem("savedPassword");
        }
        
        setUser({ id: 'temp-id', email})
        setLoading(false);
        router.replace('/(tabs)/Journey')
    };

    const signup = async (email: string, password: string) => {
        setLoading(true);
        setUser({ id: 'temp-id', email})
        setLoading(false);
        router.replace('/(tabs)/Journey')
    }

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("savedEmail");
        await AsyncStorage.removeItem("savedPassword");
        router.replace("/(auth)/Login");
    };
 
    const resetPassword = async (email: string) => {
        console.log(`Password reset requested for ${email}`);
    }

    return (
        <AppContext.Provider value={{ user, loading, login, signup, logout, resetPassword}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
    return ctx;
};
