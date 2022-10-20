import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { useContext, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound'

// import { Audio } from 'expo-av'

import LightToggle from './LightToggle'
import StartSelectButtons from './StartSelectButtons'

import ActionsButtons from './actions/ActionsButtons'
import DirectionButtons from './directions/DirectionButtons'
import SettingsModal from './modals/SettingsModal'

import { SocketContext } from './contexts/SocketContext'

function Joycon() {
    const [settingsModalIsVisible, setSettingsModalVisibity] = useState(false)
    const [currentSound, setCurrentSound] = useState(null)

    const { socket, serverAddress } = useContext(SocketContext)

    useEffect(() => {
        socket.on('sound', async (gameName) => {
            if (gameName === 'MainMenu' && currentSound !== null) {
                currentSound.stopAsync()
                setCurrentSound(null)
                return
            }
            if (currentSound === null) {
                const sound = new Sound(`http://${serverAddress}:3000/api/sounds/${gameName}`)
                sound.setNumberOfLoops(-1)
                sound.play()
                setCurrentSound(sound)
                return
            }
        })
        return () => socket.off('sound')
    })

    return (
        <>
            <View style={styles.view}>
                <DirectionButtons />
                <View style={styles.middle_container}>
                    <LightToggle />
                    <View style={{ flex: 1 }}></View>
                    <StartSelectButtons />
                </View>
                <ActionsButtons />
                <TouchableOpacity style={{ position: 'absolute', top: 20, right: 0, width: 50, height: 50 }} onPress={() => setSettingsModalVisibity(true)}>
                    <FontAwesomeIcon icon={faGear} size={25} />
                </TouchableOpacity>
            </View>
            <SettingsModal visible={settingsModalIsVisible} dismiss={() => setSettingsModalVisibity(false)} />
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
    },

    middle_container: {
        flexDirection: 'column',
        justifyContexnt: 'space-between',
        marginBottom: 30,
    },
})

export default Joycon
