import { Socket } from "socket.io-client";
import { AppEventType, AppState, InitEvent, LightChangeEvent, LiveDataEvent, NotificationEvent, NotificationI, SyncEvent } from "../../interface";
import { formatDate } from "../../utils/data";

export type AppActionType =
    // input events
    | {
        type: AppEventType.Sync,
        event: SyncEvent,
    }
    | {
        type: AppEventType.LiveData,
        event: LiveDataEvent,
    }
    | {
        type: AppEventType.Notification,
        event: NotificationEvent,
    }
    | {
        type: AppEventType.Init,
        event: InitEvent,
    }
    | {
        type: 'set-socket',
        socket: Socket | null
    } | {
        type: 'set-is-connected-to-server',
        is_connected_to_server: boolean
    }

const appendValue = <T>(array: T[], value: T, max_length: number = 7) => {

    const new_array = [...array];

    if (new_array.length >= max_length && max_length > 0) {
        new_array.shift();
    }

    new_array.push(value);

    return new_array;
}

export const appReducer = (state: AppState, action: AppActionType): AppState => {

    switch (action.type) {
        case AppEventType.Sync:
            return {
                ...state,
                global_state: {
                    is_light_on: action.event.payload.is_light_on,
                    vent_state: action.event.payload.vent_state,
                }
            };

        case AppEventType.LiveData:

            const { air_quality, light, temperature, labels } = state.live_data;
            const { air_quality: aq_value, light: lg_value, temperature: tp_value, timestamp: l_value, presence } = action.event.payload;

            const formated_label = formatDate(new Date(l_value));

            return {
                ...state,
                live_data: {
                    air_quality: appendValue(air_quality, aq_value),
                    light: appendValue(light, lg_value),
                    temperature: appendValue(temperature, tp_value),
                    labels: appendValue(labels, formated_label),
                    presence
                }
            }
        case AppEventType.Notification:
            return {
                ...state,
                notifications: [action.event.payload].concat(state.notifications)
            }
        case AppEventType.Init:

            const prevNotification = action.event.payload.previous_notifications || [];
            return {
                ...state,
                client_info: {
                    is_esp8266_connected: action.event.payload.is_esp8266_connected,
                },
                notifications: [
                    ...prevNotification,
                    ...state.notifications
                ]
            }

        case 'set-socket':
            return {
                ...state,
                socket: action.socket
            }

        case 'set-is-connected-to-server':
            return {
                ...state,
                is_connected_to_server: action.is_connected_to_server
            }
        default:
            return state;
    }
}