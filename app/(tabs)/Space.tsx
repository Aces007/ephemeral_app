import Header from "@/app/reusables/Header/Header";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Entypo, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Routine = {
    title: string;
    desc: string;
}

type RoutineSelection = {
    meditate: Routine[];
    introspect: Routine[];
    unwind: Routine[];
}

type RoutineList = {
    [date: string]: RoutineSelection
}

const routines : RoutineSelection[] = [
    {
        meditate: [
            {
                title: "5 MIN MEDITATION",
                desc: "A 5-minute pause to breathe and refocus."
            },
            {
                title: "10 MIN MEDITATION",
                desc: "Take 10 to return to yourself."
            },
            {
                title: "5 MIN BOX BREATHING",
                desc: "Breathe in calm, one box at a time."
            },
            {
                title: "WALKING MEDITATION",
                desc: "Move slowly with mindful steps."
            },
            {
                title: "GRATITUDE PRACTICE",
                desc: "Pause and feel thankful."
            },
            {
                title: "MINDFUL BREATHING",
                desc: "Focus gently on your breath."
            },
        ],
        introspect: [
            {
                title: "SET GOALS",
                desc: "Set gentle direction, not pressure."
            },
            {
                title: "DAILY GRATITUDE",
                desc: "Notice the good, even briefly."
            },
            {
                title: "REFLECT",
                desc: "Unfold your thoughts without judgment."
            },
            {
                title: "INSIGHTS",
                desc: "Store what inspires quietly."
            },
        ],
        unwind: [
            {
                title: "GRATITUDE PRACTICE",
                desc: "A moment to appreciate the good in your life."
            }
        ]
    },
]


const Space = () => {
    const [selected, setSelected] = useState<"meditate" | "introspect" | "unwind"| null>(null);
    
    let [fontsLoaded] = useFonts({
        Inter_500Medium
    }); if (!fontsLoaded) {
        return;
    }

    return(
        <View style={styles.spaceCont}>
            <Header variant="Space" title="Space" subtitle="Mind Sanctuary" />

            <View style={styles.spaceContent}>
                <View style={styles.spaceMenu}>
                    <TouchableOpacity style={[styles.spaceMenuBtns, selected === "meditate" && styles.spaceMenuBtnsHighlighted]} onPress={() => setSelected("meditate")}>
                        <Entypo name="air" size={24} style={[styles.spaceMenuSVG, selected === "meditate" && {color: '#2B2B28'}]}/>
                        <Text style={[styles.spaceMenuLabel, selected === "meditate" && {color: '#2B2B28'}]}>Meditate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.spaceMenuBtns, selected === "introspect" && styles.spaceMenuBtnsHighlighted]} onPress={() => setSelected("introspect")}>
                        <MaterialCommunityIcons name="notebook-edit-outline" size={24} style={[styles.spaceMenuSVG, selected === "introspect" && {color: '#2B2B28'}]}/>
                        <Text style={[styles.spaceMenuLabel, selected === "introspect" && {color: '#2B2B28'}]}>Introspect</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.spaceMenuBtns, selected === "unwind" && styles.spaceMenuBtnsHighlighted]} onPress={() => setSelected("unwind")}>
                        <Fontisto name="wind" size={24} style={[styles.spaceMenuSVG, selected === "unwind" && {color: '#2B2B28'}]}/>
                        <Text style={[styles.spaceMenuLabel, selected === "unwind" && {color: '#2B2B28'}]}>Unwind</Text>
                    </TouchableOpacity>
                </View>

                {selected && (
                    <View style={styles.spaceRoutines}>
                        {routines[0][selected].map((routine, index) => (
                            <View key={index} style={{borderWidth: 2}}>
                                <Text>{routine.title}</Text>
                                <Text>{routine.desc}</Text>
                            </View>
                        ))}
                </View>
                )}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    spaceCont: {
        flex: 1,
        padding: 20,
        backgroundColor: "#101B29",
    },
    spaceContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
    },
    spaceMenu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 8,
    },
    spaceMenuBtns: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#A994E9',
        padding: 16,
        borderRadius: 8,
    },
    spaceMenuBtnsHighlighted: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#CAC4E7',
        padding: 16,
        borderRadius: 8,
    },
    spaceMenuSVG: {
        color: '#F0F0F0',
    },
    spaceMenuLabel: {
        color: '#F0F0F0',
        fontFamily: 'Inter_500Medium',   
    },
    spaceRoutines: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
})

export default Space;