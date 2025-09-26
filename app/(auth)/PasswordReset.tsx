import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Fontisto } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const { resetPassword } = useAppContext();

    const router = useRouter();

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium
    }); if (!fontsLoaded) {
        return;
    }

    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert("Email Required", "Please provide your email to reset your password.");
            return;
        } try {
            await resetPassword(email.trim());
            Alert.alert("Reset Link Sent", "A password reset link has been sent to your email.");
            router.replace("/Login");
        } catch (error: any) {
            Alert.alert("Reset Failed", error.message);
        }

    }

    return (
        <View style={styles.PassResetCont}>
            <View style={styles.PassResetContent}>
                <Text style={styles.PassResetHeader}>Reset Your Password</Text>
                <View style={styles.FormCont}>
                    <Fontisto name="email" size={24} style={styles.inputSVGs}/>
                    <TextInput
                        style={styles.inputFields}
                        placeholder="Provide your email"
                        placeholderTextColor={'#FFFFFF'}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.PassResetBtnsCont}>
                    <TouchableOpacity style={styles.BackBtnCont} onPress={() => router.replace("/Login")}>
                        <Text style={styles.ReturnResetBtn}>Return</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetBtnCont} onPress={() => handlePasswordReset()}>
                        <Text style={styles.ReturnResetBtn}>Send Reset Link</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    PassResetCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        paddingTop: 40,
        backgroundColor: "#101B29",
        gap: 24,
    },
    PassResetContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: '#2A333D33',
        width: 350,
        borderRadius: 16,
    },
    PassResetHeader: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 32,
        color: '#F0F0F0',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    FormCont: {
        backgroundColor: '#2E363E',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 280, 
    },
    inputSVGs: {
        color: '#F0F0F0',
    },
    inputFields: {
        fontFamily: 'Roboto_400Regular',
        opacity: 0.5,
        color: '#F0F0F0',
        fontWeight: '800',
    },
    PassResetBtnsCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    BackBtnCont: {
        backgroundColor: '#A994E9',
        padding: 12,
        borderRadius: 8,
    },
    resetBtnCont: {
        backgroundColor: '#6BD5CE',
        padding: 12,
        borderRadius: 8,
    },
    ReturnResetBtn: {
        fontFamily: 'Roboto_500Medium',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#101B29',
        fontSize: 16,
        letterSpacing: 1,
    },
})

export default PasswordReset;