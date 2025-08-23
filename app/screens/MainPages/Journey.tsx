import Header from "@/app/reusables/Header/Header";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";


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


    return(
        <View style={styles.journeyCont}>
            <Header variant="Journey" title="Good Evening" subtitle="Ace"/>

            <View style={styles.journeyContent}>
                
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
        alignItems: 'center'
    },
})

export default Journey;