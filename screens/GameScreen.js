import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Button, Alert, ScrollView } from "react-native"
import NumberContainer from "../components/NumberContainer"
import Card from "../components/Card"
import MainButton from "../components/MainButton"
import DefaultStyles from "../constants/default-styles"
import { Ionicons } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNum = Math.floor(Math.random() * (max - min)) + min
    if (randomNum === exclude) {
        //recursion
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNum
    }
}

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])

    //initial boundaries that we'll update depending on nextGuessHandler
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, pastGuesses])


    const nextGuessHandler = direction => {
        //validation of lower/greater, if we give an incorrect hint, use an Alert
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            //3rd arg is an array
            Alert.alert(`Don\'t lie!`, 'You know that this is wrong', [{ text: 'Sorry!', style: 'cancel' }])
            //stop function execution if incorrect value 
            return
        }
        //if validation is correct
        if (direction === 'lower') {
            //new random num should be generated where current guess is maximum upper bound
            //current max & min should adjust over time as we give hints 
            //If I'm telling you the computer that the # you guessed is too big and you shoudl guess a lower one, then I know this # which I guessed is my current high
            currentHigh.current = currentGuess
        } else {
            //add 1 to insure new lower boundary which is included in rando # generation is 1 higher than current guess
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>
                Opponent's Guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>

                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>

            </Card>
            <ScrollView>
                {pastGuesses.map((guess) => <View key={guess}><Text>{guess}</Text></View>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
        borderColor: 'red',

    }
})

export default GameScreen