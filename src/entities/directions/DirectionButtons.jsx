import { StyleSheet, View } from 'react-native'
import DirectionButton from './DirectionButton'

function DirectionButtons() {
    return (
        <View style={styles.container}>
            <View style={[styles.directionButton, styles.right]}>
                <DirectionButton orientation={'right'} />
            </View>
            <View style={[styles.directionButton, styles.up]}>
                <DirectionButton orientation={'up'} />
            </View>
            <View style={[styles.directionButton, styles.left]}>
                <DirectionButton orientation={'left'} />
            </View>
            <View style={[styles.directionButton, styles.down]}>
                <DirectionButton orientation={'down'} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionButton: {
        position: 'absolute',
        paddingTop: 50,
        height: 80,
        width: 50,
    },
    up: {
        transform: [{ rotate: '180deg' }],
    },
    left: {
        transform: [{ rotate: '90deg' }],
    },
    right: {
        transform: [{ rotate: '-90deg' }],
    },
    down: {},
})

export default DirectionButtons
