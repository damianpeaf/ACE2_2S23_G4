import { AppEventType, AppState, LiveDataEvent, NotificationEvent, SyncEvent } from "../../interface";

export type AppActionType =
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

            return {
                ...state,
                live_data: {
                    air_quality: appendValue(air_quality, aq_value),
                    light: appendValue(light, lg_value),
                    temperature: appendValue(temperature, tp_value),
                    labels: appendValue(labels, l_value),
                    presence
                }
            }
        case AppEventType.Notification:
            return {
                ...state,
                notifications: state.notifications.concat(action.event.payload)
            }

        default:
            return state;
    }
}