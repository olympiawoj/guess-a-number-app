import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import Card from "../components/Card"
import Colors from "../constants/colors"
import Input from "../components/Input"

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'cancel', onPress: resetInputHandler }])
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
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
                        value={enteredValue}
                        onChangeText={numberInputHandler}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button color={Colors.accent} title="Reset" onPress={resetInputHandler} /></View>
                        <View style={styles.button}>
                            <Button color={Colors.primary} title="Guess" onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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