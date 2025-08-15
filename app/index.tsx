import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const Splash = () => {
  const [showLoader, setShowLoader] = useState(true);

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      const Timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000)

      return () => clearTimeout(Timer);
    }
  }, [fontsLoaded])

  if (showLoader) {
    return (
      <View style={styles.loadCont}>
        <ActivityIndicator size="large" color="fff" />
      </View>
    );
  }

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
  loadCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1A222B",
  },
  splashCont: {
    flexGrow: 1,
    padding: 20,
    borderWidth: 2,
    borderColor: 'lime',
    backgroundColor: "#1A222B"
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: 'red',
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
