export type VentState = 'off' | 'vel_1' | 'vel_2';

export enum AppEventType {
    Init = 'init_client',
    Sync = 'global_state_sync',
    LiveData = 'live_data',
    Notification = 'notification',
    // output events
    LightChange = 'light_change',
    VentChange = 'vent_change',
}

export type AppEvent = {
    type: AppEventType;
    payload: any;
};

export type InitEvent = {
    type: AppEventType.Init;
    payload: {
        is_esp8266_connected: boolean;
        previous_notifications?: Notification[];
    }
};

export type SyncEvent = {
    type: AppEventType.Sync;
    payload: {
        is_light_on: boolean;
        vent_state: VentState;
    };
};

export type LiveDataEvent = {
    type: AppEventType.LiveData;
    payload: {
        temperature: number;
        light: number;
        air_quality: number;
        timestamp: string;
        presence: boolean;
    };
};

export type NotificationEvent = {
    type: AppEventType.Notification;
    payload: {
        type: 'warning' | 'error' | 'info';
        message: string;
        timestamp: string;
    };
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
