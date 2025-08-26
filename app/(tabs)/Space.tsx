import Header from "@/app/reusables/Header/Header";
import { StyleSheet, View } from "react-native";

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
                title: "GRATITUDE PRACTICE",
                desc: "A moment to appreciate the good in your life."
            }
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
    

    return(
        <View style={styles.spaceCont}>
            <Header variant="Space" title="Space" subtitle="Mind Sanctuary" />

            <View style={styles.spaceContent}>

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
})

export default Space;