import React from "react";
import { View, Text, StyleSheet } from "react-native"

const StartGameScreen = props => {
    return (
        <View styles={styles.screen}>
            <Text>The Game Screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        padding: 10,


    }
})

export default StartGameScreen