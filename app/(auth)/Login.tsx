import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Feather, Fontisto } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";


const Login = () => {
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
    const { login } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [savedCredentials, setSavedCredentials] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem("savedEmail");
                const savedPassword = await AsyncStorage.getItem("savedPassword");

                if (savedEmail) {
                    setEmail(savedEmail);
                }
                if (savedPassword) {
                    setPassword(savedPassword);
                }
                if (savedEmail && savedPassword) {
                    setSavedCredentials(true);
                }
            } catch (error: any) {
                console.error("Failed to load saved credentials:", error);
            }
        };

        loadCredentials();
    }, []);
    
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    }); if (!fontsLoaded) {
        return <View><Text>Loading</Text></View>;
    }

    const handleLogin = async () => {
        try {
            await login(email, password, savedCredentials);
            router.replace("/Journey");
        } catch (err: any) {
            Alert.alert("Login Error", err.message);
        }
    }


    return (
        <View style={styles.LoginCont}>
            <Text style={styles.loginHeader}>Login To Your Account</Text>
            
            <View style={styles.LoginContent}>
                <Text style={styles.loginSubHeader}>Enter your login information</Text>

                <View style={styles.LoginForm}>
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
                    <View style={styles.FormCont}>
                        <Feather name="lock" size={24} style={styles.inputSVGs}/>
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Provide your password"
                            placeholderTextColor={'#FFFFFF'}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
                <View style={styles.formOptions}>
                    <TouchableOpacity style={styles.formOptionsCont} onPress={() => setSavedCredentials(!savedCredentials)}> 
                        <View style={[styles.formOptionsCheck, savedCredentials && { backgroundColor: '#6BD5CE'}]}/>
                        <Text style={styles.formOptionsCheckTxt}>Remember Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/PasswordReset')}>
                        <Text style={styles.forgotTxt}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.formBtnCont} onPress={handleLogin}>
                    <Text style={styles.formBtn}>Login</Text>
                </TouchableOpacity>

                <View style={styles.dividerCont}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerTxt}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.formBtnAlt}>
                    <TouchableOpacity style={styles.formBtnAltCont}>
                        <FontAwesome name="google" size={24} color={'#f0f0f0'}/>
                        <Text style={styles.formAltBtnTxt}>Google</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.formBtnAltCont}>
                        <FontAwesome name="facebook" size={24} color={'#f0f0f0'}/>
                        <Text style={styles.formAltBtnTxt}>Facebook</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.suggestionCont}>
                    <Text style={styles.suggestionTxt}>Don’t have an account yet?</Text>

                    <TouchableOpacity style={styles.registerBtnCont}
                        onPress={() => {
                            setIsLoadingSignUp(true);
                            setTimeout(() => {
                                router.replace('/SignUp');
                                setIsLoadingSignUp(false);
                            }, 2000)
                        }}
                        disabled={isLoadingSignUp}
                    >
                        {isLoadingSignUp ? (
                            <ActivityIndicator size="large" color="#2A333D" /> 
                        ) : (
                                <Text style={styles.registerBtn}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    LoginCont: {
        flex: 1,
        padding: 24,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: "#101B29",
        gap: 24,
    },
    loginHeader: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 32,
        color: '#F0F0F0',
        textAlign: 'center',
        marginTop: 40,
        textTransform: 'uppercase',
    },
    LoginContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        padding: 24,
        backgroundColor: '#2A333D33',
        width: 350,
        borderRadius: 16,
    },
    loginSubHeader: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        color: '#F0F0F0',
        textAlign: 'center',
    },
    LoginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
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
    formOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
        marginBottom: 8,
    },
    formOptionsCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    formOptionsCheck: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#F0F0F0',
    },
    formOptionsCheckTxt: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 12,
        color: '#F0F0F0',
    },
    forgotTxt: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 12,
        color: '#6BD5CE',
    },
    formBtnAlt: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    formBtnCont: {
        backgroundColor: '#6BD5CE',
        width: 280,
        padding: 12,
        borderRadius: 8,
    },
    formBtnAltCont: {
        backgroundColor: '#272C3C',
        width: 130,
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    formBtn: {
        fontFamily: 'Roboto_500Medium',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#101B29',
        fontSize: 18,
        letterSpacing: 1,
    },
    formAltBtnTxt: {
        fontFamily: 'Roboto_500Medium',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#f0f0f0',
        fontSize: 16,
        letterSpacing: 1,
    },
    dividerCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerLine: {
        flex:1,
        height: 1,
        backgroundColor: '#F0F0F033',
    },
    dividerTxt: {
        fontFamily: 'Roboto_500Medium',
        color: '#F0F0F0',
        fontSize: 16,
    },
    suggestionCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    suggestionTxt: {
        fontFamily: 'Roboto_400Regular',
        color: '#F0F0F0',
    },
    registerBtn: {
        fontFamily: 'Roboto_400Regular',
        color: '#6BD6CF',
        textDecorationLine: 'underline',
    },
    registerBtnCont: {
        
    },
})
export default Login;