import { StyleSheet, View } from 'react-native'
import ButtonA from './ButtonA'
import ButtonB from './ButtonB'

function ActionsButtons() {
    return (
        <View style={styles.container}>
            <ButtonA />
            <ButtonB />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default ActionsButtons
