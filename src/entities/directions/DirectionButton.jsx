import { useContext, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { SocketContext } from '../contexts/SocketContext'

function DirectionButton(props) {
    const { socket } = useContext(SocketContext)

    const opacity = useRef(new Animated.Value(1)).current
    const [isActive, toggleActive] = useState(false)

    const toggleButton = () => {
        toggleActive(!isActive)
        let val = 0.1
        if (isActive) {
            val = 1
        }
        Animated.timing(opacity, {
            toValue: val,
            duration: 50,
            useNativeDriver: true,
        }).start()
    }

    const gesture = Gesture.Pan()
        .onBegin(() => {
            if (!isActive) {
                toggleButton()
                socket.emit('direction', {
                    orientations: [props.orientation],
                    type: 'push',
                })
            }
        })
        .onFinalize(() => {
            if (isActive) {
                toggleButton()
                socket.emit('direction', {
                    orientations: [props.orientation],
                    type: 'released',
                })
            }
        })

    return (
        <GestureDetector gesture={gesture} style={{ width: 50, height: 80 }}>
            <Animated.View style={{ opacity: opacity }}>
                <View style={styles.directionArrow}></View>
                <View style={styles.directionTrail}></View>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    directionTrail: {
        width: 50,
        height: 50,
        backgroundColor: 'gray',
    },
    directionArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 35,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'gray',
    },
})

export default DirectionButton
