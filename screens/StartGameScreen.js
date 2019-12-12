import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native"
import Card from "../components/Card"
import Colors from "../constants/colors"
import Input from "../components/Input"
import NumberContainer from "../components/NumberContainer"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton"

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }

    })

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'cancel', onPress: resetInputHandler }])
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)} >START GAME</MainButton>
            </Card>

        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticaloffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
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
                                <View style={{ width: buttonWidth }}>
                                    <Button color={Colors.accent} title="Reset" onPress={resetInputHandler} /></View>
                                <View style={{ width: buttonWidth }}>
                                    <Button color={Colors.primary} title="Guess" onPress={confirmInputHandler} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
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
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        // width: 300,
        // maxWidth: '80%',
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
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
    // button: {
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 100,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen