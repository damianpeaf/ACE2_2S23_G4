

import { createContext, useReducer } from 'react'
import { AppState } from '../../interface'
import { AppActionType, appReducer } from './app-reducer'

const initialState: AppState = {
    live_data: {
        air_quality: [],
        labels: [],
        light: [],
        temperature: [],
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
    socket: null
}

export const Context = createContext({} as { state: AppState, dispatch: React.Dispatch<AppActionType> })

interface AppContextProps {
    children: React.ReactNode
}

export const AppContext = ({ children }: AppContextProps) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <Context.Provider value={{
            state,
            dispatch
        }}>{children}</Context.Provider>
    )
}