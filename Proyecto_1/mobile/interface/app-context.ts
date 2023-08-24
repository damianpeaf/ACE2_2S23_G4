import { Socket } from "socket.io-client"
import { VentState } from "./"

export type NotificationType = 'warning' | 'error' | 'info'

export interface NotificationI {
    type: NotificationType,
    message: string,
    timestamp: string,
}

export interface AppState {
    live_data: {
        temperature: number[],
        light: number[],
        air_quality: number[],
        labels: string[],
        presence: boolean,
    },
    global_state: {
        is_light_on: boolean,
        vent_state: VentState,
    },
    notifications: NotificationI[],
    client_info: {
        is_esp8266_connected: boolean,
    },
    socket: Socket | null,
    is_connected_to_server: boolean,
}