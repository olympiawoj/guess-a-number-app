import React from "react"

import { View, Image, StyleSheet, Button } from "react-native"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game is over!</TitleText>
            <Image style={styles.image} source={require('../assets/success.png')} />
            <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="NEW GAME" onPress={props.onRestart} />
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
        width: '80%',
        height: 300
    }
})
export default GameOverScreen