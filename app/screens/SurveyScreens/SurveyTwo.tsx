import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const SurveyTwo = () => {
    const [step, setStep] = useState(1);
    const [otherInput, setOtherInput] = useState("");
    const [selected, setSelected] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
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
                            <>
                                <TextInput 
                                    placeholder="What's the other reason"
                                    placeholderTextColor="#666"
                                    value={otherInput}
                                    onChangeText={setOtherInput}
                                />
                                <SurveyButton text="Continue" onPress={nextStep}/>
                            </>
                        )}
                    </View>
                )}

                {step === 2 && (
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

                {step === 3 && (
                    <>
                        <Image source={require('../../../assets/images/misc/medGraphic2.png')} style={styles.medGraphic2}/>
                        <Text style={styles.surveyHeaders}>What should we call you?</Text>
                        <TextInput
                            placeholder="Give us a name"
                            placeholderTextColor="#666"
                        />
                        <SurveyButton text="Proceed" onPress={nextStep}/>
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
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'green',
    },
    surveyButtonsTxt: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    }
})

export default SurveyTwo;