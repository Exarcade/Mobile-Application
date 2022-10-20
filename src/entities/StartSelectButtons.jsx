import { StyleSheet, View } from 'react-native'
import ButtonSelect from './actions/ButtonSelect'
import ButtonStart from './actions/ButtonStart'

function StartSelectButtons() {
    return (
        <View style={styles.content}>
            <ButtonStart />
            <ButtonSelect />
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        width: 125,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default StartSelectButtons
