import { useContext, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { SocketContext } from '../contexts/SocketContext'

function ButtonB() {
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
                    type: 'B',
                })
            }
        })
        .onFinalize(() => {
            if (isActive) toggleButton()
        })

    return (
        <View style={[styles.button_container, { borderColor: '#8B0000' }]}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.button, { backgroundColor: 'red', opacity: opacity }]}>
                    <Text style={{ color: 'white' }}>B</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    button_container: {
        height: 85,
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 5,
        marginHorizontal: 20,
    },
    button: {
        height: 75,
        width: 75,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default ButtonB
