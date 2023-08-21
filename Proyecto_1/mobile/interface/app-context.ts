
export type VentState = 'off' | 'vel_1' | 'vel_2'

export type NotificationType = 'warning' | 'error' | 'info'

interface Notification {
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
    notifications: Notification[]
}