import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

const Splash = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace("./screens/SurveyScreens/SurveyOne");
      }, 5000)

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded])

    return (
        <View style={styles.splashCont}>
            <View style={styles.splashContent}>
              <Image source={require('../assets/images/ephemeral/ephemeralDark.png')} style={styles.splashLogo}/>
              <Text style={styles.splashBrand}>ephemeral</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  splashCont: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1A222B"
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  splashBrand: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: "white",
  },
  splashLogo: {
    width: 175,
    height: 150,
  },
})

export default Splash;
