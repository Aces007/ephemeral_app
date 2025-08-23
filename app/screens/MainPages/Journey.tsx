import Header from "@/app/reusables/Header/Header";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const generateWeek = () => {
    return Array.from({ length: 7 }, (_, i) => {
        const date = dayjs().add(i, "day");
        return {
            key: date.format("YYYY-MM-DD"),
            day: date.format("ddd"),
            date: date.format("D"),
        }
    })
}

const Journey = () => {
    const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));
    const days = generateWeek();

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Inter_500Medium,
        Roboto_500Medium,
        Roboto_400Regular,
    }); if (!fontsLoaded) {
        return;
    }

    

    return(
        <View style={styles.journeyCont}>
            <Header variant="Journey" title="Good Evening" subtitle="Ace"/>

            <View style={styles.journeyContent}>
                <FlatList
                    horizontal
                    data={days}
                    keyExtractor={(item) => item.key}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 14 }} />} 
                    renderItem={({ item }) => {
                        const isSelected = item.key === selected;
                        return (
                            <TouchableOpacity
                                onPress={() => setSelected(item.key)}
                                style={[styles.calendarContent, isSelected ? { backgroundColor: '#CAC4E7' } : { backgroundColor: '#A994E9' }]}
                            >
                                <Text style={[styles.calendarDateTxt, {color: isSelected ? "#2B2B28" : "#F0F0F0"}]}>{item.date}</Text>
                                <Text style={[styles.calendarDayTxt, {color: isSelected ? "#2B2B28" : "#F0F0F0"}]}>{item.day}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

                <View style={styles.subHeaderCont}>
                    <Text style={styles.subheadQuote}>Emotional Rest</Text>
                    <Text style={styles.subheadSubQuote}>How can I care for myself right now?</Text>
                </View>

                <View style={styles.dailyCont}>
                    <View
                        style={styles.dailyMain}
                    >
                        <Text>TEST</Text>
                        <Text>TEST</Text>
                    </View>
                    
                    <View
                        style={styles.dailySub}
                    >
                        <Text>TEST</Text>
                        <Text>TEST</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    journeyCont: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#101B29"
    },
    journeyContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 24,
    },
    calendarContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 2,
        padding: 16,
        borderRadius: 8,
    },
    calendarDateTxt: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
    },
    calendarDayTxt: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
    subHeaderCont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    subheadQuote: {
        fontFamily: 'Roboto_500Medium',
        color: '#F0F0F0',
        fontSize: 22,
    },
    subheadSubQuote: {
        fontFamily: 'Roboto_400Regular',
        color: '#F0F0F0',
        fontSize: 14,
    },
    dailyCont: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dailyMain: {
        borderWidth: 2,
        borderColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    dailySub: {
        borderWidth:2,
        borderColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default Journey;