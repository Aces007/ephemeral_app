import { Roboto_400Regular, Roboto_500Medium, useFonts } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
    variant: "Journey" | "Space" | "You";
    title?: string; // Screen Title/Greeting(Journey)
    subtitle?: string; // Screen Sub Tag/User Name(Journey)
    onPressProfile?: () => void;
}

const Header = ({ variant, title, subtitle, onPressProfile }: HeaderProps) => {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    });
    
    if (!fontsLoaded) {
        return;
    }


    if (variant === "Space") {
        return (
            <View style={styles.variantCont}>
                <View style={styles.variantContent}>
                    <View style={styles.headerLeft}>
                        <Text>{title ?? "Space"}</Text>
                        <Text>{subtitle ?? "Mind Sanctuary"}</Text>
                    </View>
                    
                    <View style={styles.headerRight}>
                        <Ionicons name='heart' size={35}  color="#2A333D" />
                        <Ionicons name='notifications' size={35}  color="#2A333D" />
                    </View>
                </View>
            </View>
        )
    }
    
    if (variant === "You") {
        return (
            <View style={styles.variantCont}>
                <View style={styles.variantContent}>
                    <View style={styles.headerLeft}>
                        <Text>{title ?? "You"}</Text>
                        <Text>{subtitle ?? "Inner Growth"}</Text>
                    </View>
                    
                    <View style={styles.headerRight}>
                        <Ionicons name='heart' size={35}  color="#2A333D" />
                        <Ionicons name='notifications' size={35}  color="#2A333D" />
                    </View>
                </View>
            </View>
        )
    }

    
    return (
        <View style={styles.variantCont}>
            <View style={styles.variantContent}>
                <View style={styles.headerLeft}>
                    <Text style={styles.variantTitle}>{title ?? "Journey"}</Text>
                    <Text style={styles.variantSubTitle}>{subtitle ?? "Building Paths"}</Text>
                </View>
                
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.variantIconsCont}>
                        <Ionicons name='notifications-outline' size={24} style={styles.variantIcons}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.variantIconsCont}>
                        <Ionicons name='person-outline' size={24} style={styles.variantIcons}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    variantCont: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#101B29"
    },
    variantContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        display: 'flex',
        gap: 10,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    variantTitle: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        fontSize: 21,
        opacity: 0.7,
    },
    variantSubTitle: {
        fontFamily: 'Roboto_400Regular',
        color: 'white',
        fontSize: 25,
    },
    variantIconsCont: {
        backgroundColor: '#2A333D',
        padding: 8,
        borderRadius: 60,
    },
    variantIcons: {
        color: 'white',
    },
})

export default Header;