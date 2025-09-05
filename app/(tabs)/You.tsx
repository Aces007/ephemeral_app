import { Inter_300Light, Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../reusables/Header/Header";

const You = () => {
    const [selectedTab, setSelectedTab] = useState<"daily" | "monthly">("daily");

    let [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_500Medium,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    })

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
        paddingBlock: 8,
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
})




export default You;