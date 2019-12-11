import React from "react"

import { View, Image, StyleSheet, Button } from "react-native"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={100}
                    style={styles.image}
                    source={{ uri: 'https://goodstock.photos/wp-content/uploads/2017/11/Snow-Covered-Mountain-Peak.jpg' }}
                    resizeMode="cover" />
            </View>
            <BodyText>Number of Rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button style={styles.button} title="NEW GAME" onPress={props.onRestart} />
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
    }
})
export default GameOverScreen