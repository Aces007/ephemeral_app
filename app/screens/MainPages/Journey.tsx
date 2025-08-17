import Header from "@/app/reusables/Header/Header";
import { StyleSheet, View } from "react-native";

const Journey = () => {
    return(
        <View style={styles.journeyCont}>
            <Header variant="Journey" title="Good Evening" subtitle="Ace"/>
        </View>
    )
}

const styles = StyleSheet.create({
    journeyCont: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#101B29"
    },
})

export default Journey;