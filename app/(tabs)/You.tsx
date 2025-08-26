import { StyleSheet, View } from "react-native";
import Header from "../reusables/Header/Header";

const You = () => {
    return(
        <View style={styles.youCont}>
            <Header variant="You" title="You" subtitle="Inner Growth" />

            <View style={styles.youContent}>

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
    }
})

export default You;