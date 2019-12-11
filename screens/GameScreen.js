import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from "react-native"
import NumberContainer from "../components/NumberContainer"
import Card from "../components/Card"
import MainButton from "../components/MainButton"
import BodyText from "../components/BodyText"
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()
    ])

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
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    let listContainerStyle = styles.listContainer
    if (Dimensions.get('window').width < 350) {
        listContainerStyle = styles.listContainerBig
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>
                Opponent's Guess
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={Dimensions.get('window').height > 600 ? styles.buttonContainer : styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>

                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>

            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list} keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
        borderColor: 'red',

    },

    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        // alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    }
})

export default GameScreen