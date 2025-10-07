import { supabase } from "@/lib/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email ?? undefined });
          router.replace("/(tabs)/Journey");
        } else {
          setUser(null);
          router.replace("/(introduction)/Surveys");
        }
        setLoading(false);
      }
    );

    // Fetch the current session on mount
    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.warn("Error fetching session:", error.message);

      const session = data?.session;
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? undefined });
      } else {
        setUser(null);
      }
      setLoading(false);
    })();

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);


  // Login
  const login = async (email, password, remember = false) => {
    try {
      if (remember) {
        await AsyncStorage.multiSet([
          ["savedEmail", email],
          ["savedPassword", password],
        ]);
      } else {
        await AsyncStorage.multiRemove(["savedEmail", "savedPassword"]);
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);

      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email ?? undefined });
        router.replace("/(tabs)/Journey");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Signup
  const signup = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email ?? undefined });
        router.replace("/(tabs)/Journey");
      }
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    await AsyncStorage.multiRemove(["savedEmail", "savedPassword"]);
    router.replace("/(auth)/Login");
  };

  // Reset password
  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
  };


  return (
    <AppContext.Provider value={{ user, loading, login, signup, logout, resetPassword }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
};
