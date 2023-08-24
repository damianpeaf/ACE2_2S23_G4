import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AppEventType, InitEvent, LiveDataEvent, SyncEventPayload } from '../../../mobile/interface';

@Injectable()
export class AppSocketService {

    private esp8266Clients: Socket[];
    private mobileClients: Socket[];

    constructor() {
        this.esp8266Clients = [];
        this.mobileClients = [];
    }

    getHello(): string {
        return 'Hello World!';
    }

    registerEsp8266Client(client: Socket) {
        this.esp8266Clients.push(client);
    }

    registerMobileClient(client: Socket) {
        this.mobileClients.push(client);
    }

    unregisterEsp8266Client(client: Socket) {
        this.esp8266Clients = this.esp8266Clients.filter(c => c.id !== client.id);
    }

    unregisterMobileClient(client: Socket) {
        this.mobileClients = this.mobileClients.filter(c => c.id !== client.id);
    }

    isEsp8266Client(client: Socket) {
        return this.esp8266Clients.includes(client);
    }

    isMobileClient(client: Socket) {
        return this.mobileClients.includes(client);
    }

    isAnyEsp8266ClientConnected() {
        return this.esp8266Clients.length > 0;
    }

    getMobileClients() {
        return this.mobileClients;
    }

    sendInitMobileData(client: Socket, sendNotifications = true) {

        const event: InitEvent = {
            type: AppEventType.Init,
            payload: {
                is_esp8266_connected: this.isAnyEsp8266ClientConnected(),
                previous_notifications: sendNotifications ? [] : undefined, // TODO: get previous notifications from redis service
            }
        }

        client.emit(AppEventType.Init, event)
    }

    notifyEsp8266State() {
        this.mobileClients.forEach(client => this.sendInitMobileData(client, false));
    }

    notifySyncEvent(payload: SyncEventPayload) {
        this.mobileClients.forEach(client => {
            client.emit(AppEventType.Sync, {
                type: AppEventType.Sync,
                payload
            })
        });
    }

    // emit event to all mobile clients
    notifyLiveDataEvent(payload: LiveDataEvent) {
        this.mobileClients.forEach(client => {
            client.emit(AppEventType.LiveData, {
                type: AppEventType.LiveData,
                payload
            })
        });
    }

    getInitialData(): any {
        return {
            live_data: {
                air_quality: [12],
                labels: ["12:00"],
                light: [12],
                temperature: [23.0],
                presence: false,
            },
            global_state: {
                is_light_on: false,
                vent_state: 'off',
            },
            notifications: [],
        }
    }
}