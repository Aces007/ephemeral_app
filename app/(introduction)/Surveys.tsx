import { Inter_500Medium } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const SurveyTwo = () => {
    const [step, setStep] = useState(1);
    const [otherInput, setOtherInput] = useState("");
    const [selected, setSelected] = useState("");
    const [name, setName] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const [isLoadingExplore, setIsLoadingExplore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
        Inter_500Medium,
    })


    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [step]);

    const handleOptionPress = (option: string) => {
        setSelected(option)
        if (option === "Other") {
            return;
        }
        nextStep();
    }

    const nextStep = () => {
        fadeAnim.setValue(0);
        setStep(step + 1);
    }

    return (
        <View style={styles.surveyTwoCont}>
            <Animated.View style={[styles.surveyTwoContent, {opacity: fadeAnim, width: "100%"}]}>
                {step === 1 && (
                    <View style={styles.surveyOneCont}>
                        <View style={styles.surveyOneContent}>
                            <Image source={require('../../assets/images/misc/medGraphic.png')} style={styles.medGraphic}/>
                            <View style={styles.surveyOneContentBottom}>
                                <Text style={styles.surveyTagline}>Calm and Peace within Moments</Text>
                                <TouchableOpacity style={styles.forwardBtn} 
                                    onPress={() => {
                                        setIsLoading(true); // Initialize the loading for the Survey screen
                                        setTimeout(() => {nextStep(); setIsLoading(false);},  2000); // Wait 2 secs
                                    }}
                                    disabled={isLoading} // Then disable condition after.
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator size="large" color="#2A333D" />
                                        ):(
                                            <AntDesign name='arrowright' size={35}  color="#2A333D" />
                                        )}  
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {step === 2 && (
                    <View style={styles.surveyCont}>
                        <Text style={styles.surveyHeaders}>What brings you here today?</Text>
                        <View style={styles.surveyContent}>
                            <SurveyButton text="I feel stressed or overwhelmed" onPress={() => handleOptionPress("Stress")} />
                            <SurveyButton text="I want to improve my sleep" onPress={() => handleOptionPress("Sleep")} />
                            <SurveyButton text="I want to focus better" onPress={() => handleOptionPress("Focus")} />
                            <SurveyButton text="I want to explore mindfulness" onPress={() => handleOptionPress("Mindfulness")} />
                            <SurveyButton text="Other" onPress={() => handleOptionPress("Other")} />
                        </View>


                        {/* With Other Chosen, a TextInput appears */}
                        {selected === "Other" && (
                            <View style={styles.otherTextInputCont}>
                                <TextInput 
                                    placeholder="What's the other reason"
                                    placeholderTextColor="white"
                                    value={otherInput}
                                    onChangeText={setOtherInput}
                                    style={styles.otherTextInput}
                                />
                                <SurveyButton text="Proceed" onPress={nextStep}/>
                            </View>
                        )}
                    </View>
                )}

                {step === 3 && (
                    <View style={styles.surveyCont}>
                        <Text style={styles.surveyHeaders}>How much time can you commit daily?</Text>
                        <View style={styles.surveyContent}>
                            <SurveyButton text="Less than 5 minutes" onPress={nextStep} />
                            <SurveyButton text="5-10 minutes" onPress={nextStep} />
                            <SurveyButton text="10-20 minutes" onPress={nextStep} />
                            <SurveyButton text="Over 20 minutes" onPress={nextStep} />
                            <SurveyButton text="Not sure yet" onPress={nextStep} />
                        </View>
                    </View>
                )}

                {step === 4 && (
                    <>
                        <Image source={require('../../assets/images/misc/medGraphic2.png')} style={styles.medGraphic2}/>
                        <Text style={styles.surveyHeaders}>What should we call you?</Text>
                        <TextInput
                            placeholder="Give us a name"
                            placeholderTextColor="white"
                            value={name}
                            style={styles.surveyNameInput}
                            onChangeText={setName}
                        />
                        <SurveyButton text="Proceed" onPress={nextStep}/>
                    </>
                )}

                {step === 5 && (
                    <>
                        <View style={styles.surveyGreetingCont}>
                            <View style={styles.surveyGreetingContent}>
                                <ImageBackground source={require('../../assets/images/misc/medGraphic3.png')} style={styles.greetingBGCont} imageStyle={{ opacity: 0.5 }}>
                                    <Text style={styles.greetingHeaders}>Welcome {name}</Text>
                                    <Text style={styles.greetingSubHeaders}>What do you want to do?</Text>
                                </ImageBackground>
                            </View>

                            <TouchableOpacity style={[styles.greetingBtnsCont, { backgroundColor: '#A994E9' }]}
                                onPress={() => {
                                    setIsLoadingLogin(true); 
                                    setTimeout(() => {
                                        router.replace("/screens/UserAccount/Login");
                                        setIsLoadingLogin(false);
                                    }, 2000)
                                }}
                                disabled={isLoadingLogin} 
                            >
                                {isLoadingLogin ? (
                                    <ActivityIndicator size="large" color="#2A333D" />
                                ):(
                                    <Text style={styles.greetingBtnsTxt}>Create your profile</Text>
                                )}
                            </TouchableOpacity>
                            
                            
                            <TouchableOpacity style={[styles.greetingBtnsCont, { backgroundColor: '#6BD6CF' }]}
                                onPress={() => {
                                    setIsLoadingExplore(true); 
                                    setTimeout(() => {
                                        router.replace("/(tabs)/Journey");
                                        setIsLoadingExplore(false);
                                    }, 2000); // Wait 2 secs
                                }}
                                disabled={isLoadingExplore} // Then disable condition after.
                            >
                                {isLoadingExplore ? (
                                    <ActivityIndicator size="large" color="#2A333D" />
                                ):(
                                    <Text style={styles.greetingBtnsTxt}>Explore</Text>
                                )}  
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Animated.View>

        </View>
    );
};

type SurveyButtonProps = {
    text: string;
    onPress: () => void;
}

function SurveyButton({ text, onPress }: SurveyButtonProps ) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.surveyButtons} >
            <Text style={styles.surveyButtonsTxt}>
                {text}
            </Text>
        </TouchableOpacity>
    );
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
    surveyTwoCont: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#101B29"
    },
    surveyTwoContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
    },
    medGraphic2: {
        width: 350,
        height: 350,
    },
    surveyCont: {   
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    surveyContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    surveyHeaders: {
        fontFamily: 'Roboto_700Bold',
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
    },
    surveyButtons: {
        backgroundColor: '#A994E9',
        width: '100%',
        paddingBlock: 10,
        paddingInline: 10,
        borderRadius: 16,
    },
    surveyButtonsTxt: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    otherTextInputCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },
    otherTextInput: {
        backgroundColor: '#A994E9',
        width: 300,
        textAlign: 'center',
        borderRadius: 16,
        fontFamily: 'Roboto_400Regular',
        color: 'white',
        fontSize: 18,
    },
    surveyNameInput: {
        backgroundColor: '#A994E9',
        width: 300,
        textAlign: 'center',
        borderRadius: 16,
        fontFamily: 'Roboto_400Regular',
        color: 'white',
        fontSize: 18,
    },
    surveyGreetingCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
    },
    surveyGreetingContent: {
        backgroundColor: '#1C262F',
        borderRadius: 50,
    },
    greetingBGCont: {
        width: 400,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',    
        justifyContent: 'center',
        gap: 88,
        padding: 40,
    },
    greetingHeaders: {
        fontFamily: 'Roboto_700Bold',
        color: 'white',
        fontSize: 56,
        textAlign: 'center',
    },
    greetingSubHeaders: {
        fontFamily: 'Roboto_400Regular',
        color: 'white',
        fontSize: 25,
    },
    greetingBtnsCont: {
        width: 300,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
    },
    greetingBtnsTxt: {
        fontFamily: 'Inter_500Medium',
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 18,
    },
})

export default SurveyTwo;