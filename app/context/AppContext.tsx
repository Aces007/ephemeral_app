import { auth } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";


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
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string, remember = false) => {
        if (remember) {
            await AsyncStorage.setItem("savedEmail", email);
            await AsyncStorage.setItem("savedPassword", password);
        } else {
            await AsyncStorage.removeItem("savedEmail");
            await AsyncStorage.removeItem("savedPassword");
        }
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        await signOut(auth);
    };
 
    const resetPassword = async (email: string) => {
       await sendPasswordResetEmail(auth, email);
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
