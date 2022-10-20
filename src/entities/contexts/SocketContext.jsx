import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = React.createContext({ socket: io(`http://192.168.0.10:3000`), serverAddress: '192.168.0.10', setServerAddress: () => {} })

function SocketContextProvider(props) {
    const [serverAddress, setServerAddress] = useState('192.168.0.10')
    const [socket, setSocket] = useState(io(`http://${serverAddress}:3000`))

    useEffect(() => {
        socket.disconnect()
        const currentSocket = io(`http://${serverAddress}:3000`)
        currentSocket.emit('client')
        setSocket(currentSocket)
    }, [serverAddress])

    return <SocketContext.Provider value={{ socket, serverAddress, setServerAddress }}>{props.children}</SocketContext.Provider>
}

export default SocketContextProvider
