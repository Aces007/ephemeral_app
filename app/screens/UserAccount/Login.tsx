import { Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {

    let [fontsLoaded] = useFonts({
        Roboto_500Medium,
    }); if (!fontsLoaded) {
        return;
    }

    return (
        <View style={styles.LoginCont}>
            <Text style={styles.loginHeader}>Login To Your Account</Text>
            
            <View style={styles.LoginContent}>
                <Text>Enter your login information</Text>
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
})
export default Login;