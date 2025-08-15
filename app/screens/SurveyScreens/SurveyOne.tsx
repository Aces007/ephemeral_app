import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto';
import { AntDesign } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const SurveyOne = () => {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    })



    return (
        <View style={styles.surveyOneCont}>
            <View style={styles.surveyOneContent}>
                <Image source={require('../../../assets/images/misc/medGraphic.png')} style={styles.medGraphic}/>
                <View style={styles.surveyOneContentBottom}>
                    <Text style={styles.surveyTagline}>Calm and Peace within Moments</Text>
                    <TouchableOpacity style={styles.forwardBtn}>
                        <AntDesign name='arrowright' size={35}  color="#2A333D" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    surveyOneCont: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#101B29"
    },
    surveyOneContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    surveyOneContentBottom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 50,
    },
    medGraphic: {
        width: 350,
        height: 350,
    },
    surveyTagline: {
        textAlign: 'center',
        fontFamily: "Roboto_500Medium",
        fontSize: 30,
        color: "white",
    },
    forwardBtn: {
        backgroundColor: "#6BD6CF",
        padding: 10,
        borderRadius: 50,
    },
})

export default SurveyOne;