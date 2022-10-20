import { useContext, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { SocketContext } from '../contexts/SocketContext'

function ButtonSelect() {
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
                socket.emit('action', {
                    type: 'Select',
                })
            }
        })
        .onFinalize(() => {
            if (isActive) toggleButton()
        })

    return (
        <View>
            <Text style={{ textAlign: 'center' }}>Select</Text>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.button, { opacity: opacity }]}></Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: 125,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'gray',
        width: 50,
        height: 30,
    },
})

export default ButtonSelect
