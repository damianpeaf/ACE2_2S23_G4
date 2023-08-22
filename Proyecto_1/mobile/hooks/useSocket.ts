import { useEffect, useState } from "react";
import { Manager, Socket } from 'socket.io-client';


export const useSocket = () => {
    let socket: Socket;

    const [isConnected, setIsConnected] = useState(false)

    const connectToServer = () => {
        const manager = new Manager('http://192.168.1.7:3000', {
            transports: ['websocket'],
        });
        socket?.removeAllListeners();
        socket = manager.socket('/');

        socket.on('connect', () => {
            setIsConnected(true);
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        })
    }

    useEffect(() => {
        connectToServer();

        return () => {
            socket?.disconnect();
            socket?.removeAllListeners();
        }
    }, [])

    return {
        isConnected,
    }
}



