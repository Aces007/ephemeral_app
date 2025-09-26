import { Inter_300Light, Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../context/AppContext";
import Header from "../reusables/Header/Header";

const You = () => {
    const [selectedTab, setSelectedTab] = useState<"daily" | "monthly">("daily");
    const { logout } = useAppContext();

    let [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_500Medium,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })

    const AppPreferences = [
        {
            label: "Edit Profile",
            icon: <MaterialCommunityIcons name="account-edit" size={32} color={'#2B2B28'}/>,
            onPress: () => console.log("Edit Profile!")
        },
        {
            label: "Theme",
            icon: <Feather name="pen-tool" size={32} color={'#2B2B28'}/>,
            onPress: () => console.log("Edit Profile!")
        },
        {
            label: "Log Out",
            icon: <MaterialIcons name="exit-to-app" size={32} color={'#2B2B28'}/>,
            onPress: () => logout(),
        },
    ]

    return (
        <View style={styles.youCont}>
            <Header variant="You" title="You" subtitle="Inner Growth" />

            <View style={styles.youContent}>
                <View style={styles.toggleCont}>
                    <TouchableOpacity 
                        style={[styles.toggleBtn, selectedTab === "daily" && styles.activeToggle]}
                        onPress={() => setSelectedTab("daily")}
                    >
                        <Text
                            style={[styles.toggleTxt, selectedTab === "daily" && styles.activeToggleTxt]}   
                        >Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, selectedTab === "monthly" && styles.activeToggle]}
                        onPress={() => setSelectedTab("monthly")}
                    >
                        <Text
                            style={[styles.toggleTxt, selectedTab === "monthly" && styles.activeToggleTxt]}   
                        >Monthly</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsCont}>
                    <View style={styles.statsBoxCont}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Allotted Time</Text>
                            <Text style={styles.statsValue}>1hr</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Goal Progress</Text>
                            <Text style={styles.statsValue}>85% (6/7)</Text>
                        </View>
                    </View>
                    <View style={styles.statsBoxCont}>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Average Time</Text>
                            <Text style={styles.statsValue}>20mins</Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={styles.statsLabel}>Preferred Meditation</Text>
                            <Text style={styles.statsValue}>Box Breathing</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.appPreferencesCont}>
                    <Text style={styles.appPrefLabel}>App Preferences</Text>

                    <View style={styles.preferencesCont}>
                        {AppPreferences.map((item, index) => (
                            <TouchableOpacity key={index} onPress={item.onPress}>
                                <LinearGradient
                                    colors={['#A994E9', '#6BD6CF']}
                                    start={{x:0, y:0}}
                                    end={{x:1, y:0}}
                                    style={styles.preferencesBtnGradient}
                                >
                                    {item.icon}
                                    <Text style={styles.preferencesLabel}>{item.label}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    youCont: {
        flex: 1,
        padding: 20,
        backgroundColor: "#101B29",
    },
    youContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
    },
    toggleCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: '#2A333D',
        padding: 8,
        borderRadius: 60,
        width: '60%',
    },
    toggleBtn: {
        
    },
    activeToggle: {
        backgroundColor: '#CAC4E7', 
        paddingBlock: 8,
        paddingInline: 16,
        borderRadius: 24,
    },
    toggleTxt: {
        color: '#6BD6CF',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
    activeToggleTxt: {
        color: '#1A222B',
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
    statsCont: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    statsBoxCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 40,
    },
    statsBox: {
        display: 'flex',
        gap: 2,
    },
    statsLabel: {
        fontFamily: 'Inter_300Light',
        fontSize: 14,
        color: '#C0C0B4',
    },
    statsValue: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 24,
        color: '#F0F0F0',
    },
    appPreferencesCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 32,
    },
    appPrefLabel: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 24,
        color: '#F0F0F0'
    },
    preferencesCont: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 24,
        marginBottom: 24,
    },
    preferencesBtnGradient: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: 8,
        borderRadius: 8,
    },
    preferencesLabel: {
        fontFamily: 'Inter_500Medium',
        textTransform: 'uppercase',
        fontSize: 20,
    },
})




export default You;