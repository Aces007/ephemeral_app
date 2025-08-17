import { Inter_500Medium } from '@expo-google-fonts/inter';
import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { Roboto_400Regular, Roboto_500Medium, Roboto_600SemiBold } from '@expo-google-fonts/roboto';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Splash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoNameOpacity = useRef(new Animated.Value(0)).current;
  const tagLineOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Font Loading
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Inter_500Medium,
  })

  // Splash Screen Animation Sequence
  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(logoNameOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(tagLineOpacity, {
        toValue: 0.6,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
      <View style={styles.splashCont}>
          <View style={styles.splashContent}>
            <Animated.Image source={require('../assets/images/ephemeral/ephemeralDark.png')} style={[styles.splashLogo, { opacity: logoOpacity }]}/>
            <View style={styles.splashTexts}>
              <Animated.Text style={[styles.splashBrand, { opacity: logoNameOpacity }]}>ephemeral</Animated.Text>
              <Animated.Text style={[styles.splashTag, { opacity: tagLineOpacity }]}>let it flow</Animated.Text>
            </View>
            <Animated.View style={{ opacity: buttonOpacity }}>
              <TouchableOpacity style={styles.splashButton} 
                onPress={() => {
                  setIsLoading(true); // Initialize the loading for the Survey screen
                  setTimeout(() => {
                    router.replace("./screens/SurveyScreens/Surveys")
                  }, 2000); // Wait 2 secs
                }}
                disabled={isLoading} // Then disable condition after.
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color="#2A333D" />
                ):(
                  <Text style={styles.splashButtonTxt}>Get Started</Text>
                )}  
              </TouchableOpacity>
            </Animated.View>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  splashCont: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#101B29"
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  splashLogo: {
    width: 175,
    height: 150,
  },
  splashTexts: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  splashBrand: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    color: "white",
  },
  splashTag: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 22,
    color: "white",
    letterSpacing: 0.7,
  },
  splashButton:{
    backgroundColor: "#6BD6CF",
    padding: 10,
    borderRadius: 10,
  },
  splashButtonTxt:{
    fontFamily: 'Inter_500Medium',
    fontSize: 20,
  },
})

export default Splash;
