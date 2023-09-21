import { NotificationI } from './app-context'

export type VentState = 'off' | 'vel_1' | 'vel_2';

export type DoorState = true | false ;

export enum AppEventType {
    Init = 'init_client',
    Sync = 'global_state_sync',
    LiveData = 'live_data',
    Notification = 'notification',
    // output events
    LightChange = 'light_change',
    VentChange = 'vent_change',
    DoorChange = 'door_change'
}

export type AppEvent = {
    type: AppEventType;
    payload: any;
};

export type InitEventPayload = {
    is_esp8266_connected: boolean;
    previous_notifications?: NotificationI[];
};

export type InitEvent = {
    type: AppEventType.Init;
    payload: InitEventPayload
};


export type SyncEventPayload = {
    is_light_on: boolean;
    vent_state: VentState;
}
export type SyncEvent = {
    type: AppEventType.Sync;
    payload: SyncEventPayload
};

export type LiveDataEventPayload = {
    temperature: number;
    light: number;
    air_quality: number;
    timestamp: string;
    presence: boolean;
};

export type LiveDataEvent = {
    type: AppEventType.LiveData;
    payload: LiveDataEventPayload
};

export type NotificationEvent = {
    type: AppEventType.Notification;
    payload: NotificationI
};

export type LightChangeEvent = {
    type: AppEventType.LightChange;
    payload: {
        is_light_on: boolean;
    };
};

export type VentChangeEvent = {
    type: AppEventType.VentChange;
    payload: {
        vent_state: VentState;
    };
};


export type DoorChangeEvent = {
    type: AppEventType.DoorChange;
    payload: {
        door_state: DoorState;
    };
};
