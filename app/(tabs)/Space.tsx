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
    const [selected, setSelected] = useState(false);
    
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
                    <TouchableOpacity style={styles.spaceMenuBtns}>
                        <Entypo name="air" size={24} style={styles.spaceMenuSVG}/>
                        <Text style={styles.spaceMenuLabel}>Meditate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.spaceMenuBtns}>
                        <MaterialCommunityIcons name="notebook-edit-outline" size={24} style={styles.spaceMenuSVG}/>
                        <Text style={styles.spaceMenuLabel}>Introspect</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.spaceMenuBtns}>
                        <Fontisto name="wind" size={24} style={styles.spaceMenuSVG}/>
                        <Text style={styles.spaceMenuLabel}>Unwind</Text>
                    </TouchableOpacity>
                </View>


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
    spaceMenuSVG: {
        color: '#F0F0F0',
    },
    spaceMenuLabel: {
        color: '#F0F0F0',
        fontFamily: 'Inter_500Medium',   
    }
})

export default Space;