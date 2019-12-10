import React from "react";
import { View, Text, StyleSheet, Button } from "react-native"
import Card from "../components/Card"
import Colors from "../constants/colors"
import Input from "../components/Input"

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    blurOnSubmit
                    keyboardType="number-pad"
                    maxLength={2}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color={Colors.accent} title="Reset" onPress={() => { }} /></View>
                    <View style={styles.button}>
                        <Button color={Colors.primary} title="Guess" onPress={() => { }} /></View>
                </View>
            </Card>
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
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10

    },
    button: {
        width: 100
    },
    input: {
        width: 100,
        textAlign: 'center'
    }
})

export default StartGameScreen