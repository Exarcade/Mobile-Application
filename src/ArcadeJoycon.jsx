import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SocketContextProvider from './entities/contexts/SocketContext'

import Joycon from './entities/Joycon'

function ArcadeJoycon() {
    return (
        <SocketContextProvider>
            <GestureHandlerRootView style={styles.view}>
                <Joycon />
            </GestureHandlerRootView>
        </SocketContextProvider>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
    },
})

export default ArcadeJoycon
