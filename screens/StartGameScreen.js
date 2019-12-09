import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native"

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen!</Text>
            <View style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <TextInput />
                <View styles={styles.buttonContainer}>
                    <Button title="Reset" onPress={() => { }} />
                    <Button title="Guess" onPress={() => { }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
        width: '100%',
        borderBottomColor: 'pink'
    },
    buttonContainer: {
        flexDirection: "row",
        //use width of parent and position buttons according to the view
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        //replaces margin bottom and margin top
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        //center items horizontally on cross axis
        alignItems: 'center'
    }
})

export default StartGameScreen