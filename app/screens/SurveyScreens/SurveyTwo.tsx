import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const SurveyTwo = () => {
    const [step, setStep] = useState(1);
    const [otherInput, setOtherInput] = useState("");
    const [selected, setSelected] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [step]);

    const handleOptionPress = (option) => {
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
                    <>
                        <Text>What brings you here today?</Text>
                        <SurveyButton text="I feel stressed or overwhelmed" onPress={handleOptionPress("Stress")} />
                        <SurveyButton text="I want to improve my sleep" onPress={handleOptionPress("Sleep")} />
                        <SurveyButton text="I want to focus better" onPress={handleOptionPress("Focus")} />
                        <SurveyButton text="I want to explore mindfulness" onPress={handleOptionPress("Mindfulness")} />
                        <SurveyButton text="Other" onPress={() => handleOptionPress("Other")} />


                        {/* With Other Chosen, a TextInput appears */}
                        {selected === "Other" && (
                            <>
                                <TextInput 
                                    placeholder="What's the other reason"
                                    value={otherInput}
                                    onChangeText={setOtherInput}
                                />
                                <SurveyButton text="Continue" onPress={nextStep}/>
                            </>
                        )}
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text>How much time can you commit daily?</Text>
                        <SurveyButton text="I feel stressed or overwhelmed" onPress={nextStep} />
                        <SurveyButton text="I want to improve my sleep" onPress={nextStep} />
                        <SurveyButton text="I want to focus better" onPress={nextStep} />
                        <SurveyButton text="I want to explore mindfulness" onPress={nextStep} />
                        <SurveyButton text="Other" onPress={nextStep} />
                    </>
                )}

                {step === 3 && (
                    <>
                        <Image source={require('../../../assets/images/misc/medGraphic2.png')} style={styles.medGraphic2}/>
                        <Text>What should we call you?</Text>
                        <TextInput
                            placeholder="Give us a name"
                            placeholderTextColor="#666"
                        />
                        <SurveyButton text="Proceed" onPress={nextStep}/>
                    </>
                )}
            </Animated.View>

        </View>
    )
}

function SurveyButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>
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
})

export default SurveyTwo;