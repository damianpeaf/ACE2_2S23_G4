import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = () => {
    const manager = new Manager('http://192.168.1.7:3000', {
        transports: ['websocket'],
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
}
