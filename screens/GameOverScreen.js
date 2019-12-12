import React from "react"

import { View, Image, StyleSheet, Button, Text, Dimensions, ScrollView } from "react-native"
import BodyText from "../components/BodyText"
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton"

import Colors from "../constants/colors"

const GameOverScreen = (props) => {
    return (
        <ScrollView>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: (Dimensions.get('window').width * 0.4) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
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
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
})
export default GameOverScreen