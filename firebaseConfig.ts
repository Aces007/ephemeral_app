import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";

const firebaseConfig = {
    apiKey: "AIzaSyAXfzheReHset_z2ew5A1kMpRK-Y-5HlYU",
    authDomain: "ephemeral-atr41n.firebaseapp.com",
    projectId: "ephemeral-atr41n",            
    messagingSenderId: "607930601313",        
    appId: "1:607930601313:android:8cf0f659239ec67df17f20"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;
try {
 auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)    
});
} catch (error: any) {
    auth = getAuth(app);
}

export { auth };
export default app;

