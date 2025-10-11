import { supabase } from "@/lib/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const checkAuthState = async () => {
      try {
        setLoading(true);

        const hasSignedUp = await AsyncStorage.getItem("hasSignedUp");
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.warn("Error fetching session:", error.message);
        }

        const session = data?.session;

        if(!isMounted.current) return;

        if (session?.user) { // User is already logged in
          setUser({ id: session.user.id, email: session.user.email ?? undefined });
          setTimeout(() => {
            if (isMounted.current) router.replace("/(tabs)/Journey");
          }, 100)
        } else if (!hasSignedUp) { // First-time user
          setTimeout(() => {
            if (isMounted.current) router.replace("/(introduction)/Surveys");
          }, 100)
        } else { // Existing user 
          setTimeout(() => {
            if (isMounted.current) router.replace("/(auth)/Login");
          }, 100)
        }
      } catch (err) {
        console.error("Auth state check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? undefined });
        router.replace("/(tabs)/Journey");
      } else {
        setTimeout(() => checkAuthState(), 300);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#101B29" }}>
        <ActivityIndicator size="large" color="#2A333D" />
      </View>
    )
  };

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

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      if (data.user) {
        await AsyncStorage.setItem("hasSignedUp", "true"); 
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

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    await AsyncStorage.multiRemove(["savedEmail", "savedPassword"]);
    
    router.replace("/(auth)/Login");
  };

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
