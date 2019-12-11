import React from "react"

import { View, Image, StyleSheet, Button, Text } from "react-native"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton"

import Colors from "../constants/colors"

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={100}
                    style={styles.image}
                    source={require('../assets/success.png')}
                    resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text> rounds to guess the number <Text style={styles.highlight}> {props.userNumber}</Text>
                </BodyText>


            </View>
            <MainButton style={styles.button} onPress={props.onRestart} >NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    button: {
        marginTop: 10
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
})
export default GameOverScreen