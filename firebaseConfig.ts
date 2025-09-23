import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXfzheReHset_z2ew5A1kMpRK-Y-5HlYU",
    authDomain: "ephemeral-atr41n.firebaseapp.com",
    projectId: "ephemeral-atr41n",            
    // storageBucket: "ephemeral-12345.appspot.com", 
    messagingSenderId: "607930601313",        
    appId: "1:607930601313:android:8cf0f659239ec67df17f20"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);