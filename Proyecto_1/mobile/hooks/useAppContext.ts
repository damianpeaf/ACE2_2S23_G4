import { useContext } from "react";
import { Context } from "../components/context/AppContext";
import { AppEventType, LiveDataEvent, NotificationEvent, SyncEvent } from "../interface";



export const useAppContext = () => {

    const { state, dispatch } = useContext(Context);


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

    return {
        state,
        syncState,
        addLiveData,
        addNotification
    }

}