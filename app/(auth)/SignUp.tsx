import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { useAppContext } from "../context/AppContext";


const SignUp = () => {
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
    const { signup } = useAppContext() as any;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState<CountryCode>('PH');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const router = useRouter();

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    }); if (!fontsLoaded) {
        return;
    }

    const handleSignUp = async () => {
        try {
            await signup(email, password);
            router.replace("/Journey");
        } catch (err: any) {
            Alert.alert("Sign Up Failed", err.message);
        }
    }

    return (
        <View style={styles.LoginCont}>
            <Text style={styles.loginHeader}>Create Your Account</Text>
            
            <ScrollView contentContainerStyle={styles.LoginContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.loginSubHeader}>Provide your information</Text>

                <View style={styles.LoginForm}>
                    <View style={styles.FormCont}>
                        <FontAwesome name="user-o" size={24} style={styles.inputSVGs}/>
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Full Name"
                            placeholderTextColor={'#FFFFFF'}
                        />
                    </View>
                    <View style={styles.numberFieldCont}>
                        <CountryPicker 
                            countryCode={countryCode}
                            withCallingCode
                            withFlag
                            onSelect={country => setCountryCode(country.cca2)}
                            containerButtonStyle={styles.cPicker}
                        />
                        {/* <Ionicons name="call-outline" size={24} style={styles.inputSVGs}/> */}
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Phone Number"
                            placeholderTextColor={'#FFFFFF'}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.FormCont}>
                        <Fontisto name="email" size={24} style={styles.inputSVGs}/>
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Email"
                            placeholderTextColor={'#FFFFFF'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.passwordFieldCont}>
                        <Feather name="lock" size={24} style={styles.inputSVGs}/>
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Password"
                            placeholderTextColor={'#FFFFFF'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Feather
                                name={showPassword ? "eye-off" : "eye"}
                                size={22}
                                color="#F0F0F0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.formBtnCont} onPress={handleSignUp}>
                    <Text style={styles.formBtn}>Sign Up</Text>
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
                    <Text style={styles.suggestionTxt}>Existing account?</Text>

                    <TouchableOpacity style={styles.registerBtnCont}
                        onPress={() => {
                            setIsLoadingSignUp(true);
                            setTimeout(() => {
                                router.replace('/Login');
                                setIsLoadingSignUp(false);
                            }, 2000)
                        }}
                        disabled={isLoadingSignUp}
                    >
                        {isLoadingSignUp ? (
                            <ActivityIndicator size="large" color="#2A333D" /> 
                        ) : (
                                <Text style={styles.registerBtn}>Log In</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    LoginCont: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',
        gap: 32,
        padding: 32,
        backgroundColor: '#2A333D33',
        width: 350,
        borderRadius: 16,
    },
    loginSubHeader: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        color: '#F0F0F0',
        textAlign: 'center',
        marginBottom: 8,
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
    numberFieldCont: {
        backgroundColor: '#2E363E',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 280, 
    },
    passwordFieldCont: {
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
    cPicker: {
        width: 38,
    },
    inputFields: {
        fontFamily: 'Roboto_400Regular',
        opacity: 0.5,
        color: '#F0F0F0',
        fontWeight: '800',
        width: '64%',
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
export default SignUp;