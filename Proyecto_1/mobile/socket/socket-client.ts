import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export const connectToServer = () => {
    console.log('Connecting to server noooooooooooo')
    const manager = new Manager('http://localhost:3000/arduino')

    socket?.removeAllListeners()
    socket = manager.socket('/arduino')
}