import Header from "@/app/reusables/Header/Header";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { Roboto_400Regular, Roboto_500Medium, Roboto_600SemiBold, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


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

// Activities Data Structure Declaration (to avoid TS errors)
type Activity = {
    title: string;
    desc: string;
}

type DailyActivities = {
    main: Activity[];
    subs: Activity[];
}

type DailyData = {
    [date: string]: DailyActivities
}

const activities : DailyActivities[] = [
    {
        main: [
            {
                title: "5 MIN MEDITATION",
                desc: "A 5-minute pause to breathe and refocus."
            },
            {
                title: "INTROSPECTIVE JOURNAL",
                desc: "A quiet space to reflect and reconnect within."
            },
        ],
        subs: [
            {
                title: "BOX BREATHING",
                desc: "Breathe in rhythm to ease stress."
            },
            {
                title: "CALM SOUNDS",
                desc: "Soothing audio for peace."
            },
        ],
    },
    {
        main: [
            {
                title: "5 MIN MEDITATION",
                desc: "A 5-minute pause to breathe and refocus."
            },
            {
                title: "10 MIN MEDITATION",
                desc: "Take 10 to return to yourself."
            },
        ],
        subs: [
            {
                title: "WALKING MEDITATION",
                desc: "Move slowly with mindful steps."
            },
            {
                title: "GRATITUDE PRACTICE",
                desc: "Pause and feel thankful."
            },
        ],
    },
]



const Journey = () => {
    const [selected, setSelected] = useState(dayjs().format("YYYY-MM-DD"));
    const days = generateWeek();
    const dailyData: DailyData = {};

    days.forEach((day, index) => {
        dailyData[day.key] = activities[index % activities.length];
    }) 

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Inter_500Medium,
        Roboto_500Medium,
        Roboto_400Regular,
        Roboto_600SemiBold,
    }); 
    if (!fontsLoaded) {
        return;
    }
    

    return(
        <View style={styles.journeyCont}>
            <Header variant="Journey" title="Good Evening" subtitle="Ace"/>

            <ScrollView contentContainerStyle={styles.journeyContent} showsVerticalScrollIndicator={false}>
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
                    <View style={styles.dailyMain}>
                        {dailyData[selected]?.main.map((activity, index) => (
                            <TouchableOpacity key={index} style={styles.mainActivityBox}>
                                <Text style={styles.mainActivityTitle}>{activity.title}</Text>
                                <Text style={styles.mainActivityDesc}>{activity.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <View style={styles.dailySub}>
                        {dailyData[selected]?.subs.map((activity, index) => (
                            <TouchableOpacity key={index} style={styles.subActivityBox}>
                                <Text style={styles.subActivityTitle}>{activity.title}</Text>
                                <Text style={styles.subActivityDesc}>{activity.desc}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.dailyStatsCont}>
                    <Text style={styles.dailyStatsLabel}>Time Invested Today</Text>
                    <Text style={styles.dailyStatsData}>30mins</Text>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    journeyCont: {
        flex: 1,
        padding: 20,
        backgroundColor: "#101B29",
    },
    journeyContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
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
        gap: 32,
    },
    dailyMain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },
    dailySub: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    mainActivityBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        backgroundColor: 'gray',
        padding: 16,
        borderRadius: 8,
    },
    subActivityBox: {
        width: '45%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        backgroundColor: 'gray',
        padding: 16,
        borderRadius: 8,
    },
    mainActivityTitle: {
        width: '50%',
        textAlign: 'center',
        fontFamily: 'Roboto_600SemiBold',
        color: '#F0F0F0',
        fontSize: 16,
    },
    mainActivityDesc: {
        width: '50%',
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
        color: '#F0F0F0',
        fontSize: 14,
    },
    subActivityTitle: {
        textAlign: 'center',
        fontFamily: 'Roboto_600SemiBold',
        color: '#F0F0F0',
        fontSize: 14,
    },
    subActivityDesc: {
        textAlign: 'center',
        fontFamily: 'Roboto_400Regular',
        color: '#F0F0F0',
        fontSize: 12,
    },
    dailyStatsCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'gray',
        padding: 16,
        borderRadius: 8,
    },
    dailyStatsLabel: {
        fontFamily: 'Roboto_500Medium',
        color: '#F0F0F0',
        fontSize: 16,
    },
    dailyStatsData: {
        fontFamily: 'Roboto_700Bold',
        color: '#6BD6CF',
        fontSize: 16,
    },
})

export default Journey;