import { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'

import axios from 'axios'
import { SocketContext } from './contexts/SocketContext'

function LightToggle() {
    const { serverAddress } = useContext(SocketContext)
    const isFirstRendering = useRef(true)
    const [lights, setLights] = useState(false)

    useEffect(() => {
        if (isFirstRendering.current) {
            axios.get(`http://${serverAddress}:3000/api/lights`).then((res) => {
                const { status } = res.data
                if (lights !== status) setLights(status)
            })
            isFirstRendering.current = false
        }
    })

    const toggleLights = () => {
        setLights(!lights)
        axios.post(`http://${serverAddress}:3000/api/lights`, { status: !lights })
    }

    return (
        <View>
            <Switch
                style={styles.content}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={lights ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleLights}
                value={lights}
            />
            <Text style={styles.text}>Lights</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center',
        width: 50,
        height: 20,
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },
    text: {
        alignSelf: 'center',
    },
})

export default LightToggle
