import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAXfzheReHset_z2ew5A1kMpRK-Y-5HlYU",
  authDomain: "ephemeral-atr41n.firebaseapp.com",
  projectId: "ephemeral-atr41n",
  // storageBucket: "ephemeral-12345.appspot.com",
  messagingSenderId: "607930601313",
  appId: "1:607930601313:android:8cf0f659239ec67df17f20"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
    auth = getAuth(app)
} catch {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
}

export { auth };
export default app;
