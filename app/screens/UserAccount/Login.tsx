import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Feather, Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Login = () => {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,

    }); if (!fontsLoaded) {
        return;
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
                        />
                    </View>
                    <View style={styles.FormCont}>
                        <Feather name="lock" size={24} style={styles.inputSVGs}/>
                        <TextInput
                            style={styles.inputFields}
                            placeholder="Provide your password"
                            placeholderTextColor={'#FFFFFF'}
                        />
                    </View>
                </View>
                <View style={styles.formOptions}>

                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    LoginCont: {
        flex: 1,
        padding: 20,
        backgroundColor: "#101B29",
        gap: 32,
    },
    loginHeader: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 35,
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
    },
    formOptions: {},
})
export default Login;