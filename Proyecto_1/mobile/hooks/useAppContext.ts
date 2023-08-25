import { useContext, useEffect } from 'react';
import { Context } from "../components/context";
import { AppEventType, InitEvent, LightChangeEvent, LiveDataEvent, NotificationEvent, SyncEvent, VentChangeEvent, VentState } from "../interface";
import { Manager } from "socket.io-client";



export const useAppContext = () => {

    const { state, dispatch } = useContext(Context);
    const { socket } = state;

    const initSocket = () => {
        const manager = new Manager('https://ace22s23g4-production.up.railway.app', {
            transports: ['websocket'],
            extraHeaders: {
                authorization: 'mobile'
            }
        });
        const newSocket = manager.socket('/');

        newSocket.on('connect', () => {
            dispatch({
                type: 'set-is-connected-to-server',
                is_connected_to_server: true
            })
        })

        newSocket.on('disconnect', () => {
            dispatch({
                type: 'set-is-connected-to-server',
                is_connected_to_server: false
            })
        })

        newSocket.on(AppEventType.Init, (payload: InitEvent) => {
            initStateEvent(payload);
        })

        dispatch({
            type: 'set-socket',
            socket: newSocket
        })
    }

    const syncState = (event: SyncEvent) => {
        dispatch({
            type: AppEventType.Sync,
            event
        })
    }

    const addLiveData = (event: LiveDataEvent) => {
        dispatch({
            type: AppEventType.LiveData,
            event
        })
    }

    const addNotification = (event: NotificationEvent) => {
        dispatch({
            type: AppEventType.Notification,
            event
        })
    }

    const initStateEvent = (event: InitEvent) => {
        dispatch({
            type: AppEventType.Init,
            event
        })
    }

    const enableLight = (isLightOn: boolean) => {

        if (!socket) return;

        const event: LightChangeEvent = {
            payload: {
                is_light_on: isLightOn
            },
            type: AppEventType.LightChange
        }


        socket.emit(AppEventType.LightChange, event)
    }

    const setVentState = (ventState: VentState) => {
        if (!socket) return;

        const event: VentChangeEvent = {
            payload: {
                vent_state: ventState
            },
            type: AppEventType.VentChange
        }

        socket.emit(AppEventType.VentChange, event)
    }

    useEffect(() => {
        if (!socket) {
            initSocket();
        }
    }, [])

    return {
        state,
        syncState,
        addLiveData,
        addNotification,
        initStateEvent,
        enableLight,
        setVentState
    }

}