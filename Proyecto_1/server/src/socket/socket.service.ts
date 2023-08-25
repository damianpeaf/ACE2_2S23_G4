import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AppEventType, InitEvent, LiveDataEvent, NotificationEvent, NotificationI, SyncEvent } from './interface';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class AppSocketService {

    private readonly logger = new Logger(AppSocketService.name);

    private esp8266Clients: Socket[];
    private mobileClients: Socket[];

    constructor(@InjectRedis() private readonly redisService: Redis) {
        this.esp8266Clients = [];
        this.mobileClients = [];
    }

    // ********** Connection Events ********** //

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

    // ********** Utils ********** //

    isEsp8266Client(client: Socket) {
        return this.esp8266Clients.includes(client);
    }

    isMobileClient(client: Socket) {
        return this.mobileClients.includes(client);
    }

    isAnyEsp8266ClientConnected() {
        return this.esp8266Clients.length > 0;
    }

    // ********** Mobile Event Emition ********** //

    sendInitMobileData(client: Socket, sendNotifications = true) {

        const notifications: NotificationI[] = []

        if (sendNotifications) {
            // TODO: get previous notifications from redis service
            // this.redisService
        }

        const event: InitEvent = {
            type: AppEventType.Init,
            payload: {
                is_esp8266_connected: this.isAnyEsp8266ClientConnected(),
                previous_notifications: sendNotifications ? notifications : undefined,
            }
        }

        client.emit(AppEventType.Init, event)
        this.logger.log(`Event ${event.type} sent to mobile client: ${client.id}`);
    }

    notifyEsp8266State() {
        const event: InitEvent = {
            type: AppEventType.Init,
            payload: {
                is_esp8266_connected: this.isAnyEsp8266ClientConnected(),
            }
        }

        this.mobileClients.forEach(client => {
            client.emit(AppEventType.Init, event)
        });
    }

    broadcastEventToMobileClients(event: InitEvent | SyncEvent | LiveDataEvent | NotificationEvent) {
        this.mobileClients.forEach(client => {
            client.emit(event.type, event)
            this.logger.log(`Event ${event.type} sent to mobile client: ${client.id}`);
        });
    }

    // ********** ESP8266 Event Emition ********** //
    // TODO: implement broadcastEventToEsp8266Clients

}