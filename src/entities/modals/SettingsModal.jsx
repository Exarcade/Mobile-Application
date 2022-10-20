import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

import { useContext, useState } from 'react'
import { StatusBar, TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

import { SocketContext } from '../contexts/SocketContext'

function SettingsModal(props) {
    const { serverAddress, setServerAddress } = useContext(SocketContext)
    const [ipAddress, setIpAddress] = useState(serverAddress)

    return (
        <Modal animationIn={'slideInDown'} animationOut={'slideOutDown'} animationOutTiming={500} isVisible={props.visible} statusBarTranslucent transparent={false}>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10 }}>
                <TouchableOpacity style={{ width: 25, height: 25, margin: 5, alignSelf: 'flex-end' }} onPress={() => props.dismiss()}>
                    <FontAwesomeIcon icon={faTimesCircle} size={25} />
                </TouchableOpacity>
                <TextInput
                    value={ipAddress}
                    onChangeText={(val) => {
                        setIpAddress(val)
                        setServerAddress(val)
                    }}
                />
            </View>
            <StatusBar hidden={props.visible} />
        </Modal>
    )
}

export default SettingsModal
