import { createContext, useEffect, useReducer } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { AppEventType, AppState, NotificationEvent } from '../../interface'
import { AppActionType, appReducer } from './app-reducer'

const initialState: AppState = {
    live_data: {
        air_quality: [0],
        labels: [''],
        light: [0],
        temperature: [0],
        presence: false,
    },
    global_state: {
        is_light_on: false,
        vent_state: 'off',
    },
    notifications: [],
    client_info: {
        is_esp8266_connected: false,
    },
    socket: null,
    is_connected_to_server: false,
}

export const Context = createContext({} as { state: AppState, dispatch: React.Dispatch<AppActionType> })

interface AppContextProps {
    children: React.ReactNode
}

export const AppContext = ({ children }: AppContextProps) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {
        Toast.show({
            type: 'info',
            text1: state.is_connected_to_server ? 'Conectado al servidor' : 'Desconectado del servidor',
        })

        dispatch({
            type: AppEventType.Notification,
            event: {
                type: AppEventType.Notification,
                payload: {
                    message: state.is_connected_to_server ? 'Conectado al servidor' : 'Desconectado del servidor',
                    type: 'info',
                    timestamp: new Date().toISOString()
                },
            }
        })

    }, [state.is_connected_to_server])


    useEffect(() => {
        Toast.show({
            type: 'info',
            text1: state.client_info.is_esp8266_connected ? 'Conectado al ESP8266' : 'Desconectado del ESP8266',
        })

        dispatch({
            type: AppEventType.Notification,
            event: {
                type: AppEventType.Notification,
                payload: {
                    message: state.client_info.is_esp8266_connected ? 'Conectado al ESP8266' : 'Desconectado del ESP8266',
                    type: 'info',
                    timestamp: new Date().toISOString()
                },
            }
        })
    }, [state.client_info.is_esp8266_connected])

    return (
        <>
            <Context.Provider value={{
                state,
                dispatch
            }}>{children}</Context.Provider>

            <Toast position='bottom' bottomOffset={50} />
        </>

    )
}