import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

import { AppSocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { NotificationI, AppEventType, SyncEventPayload, LiveDataEvent, LiveDataEventPayload, SyncEvent, LightChangeEvent, VentChangeEvent } from './interface';
import { NotificationService } from './notification/notification.service';

@WebSocketGateway({ cors: true })
export class AppSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(AppSocketGateway.name);

  constructor(private readonly socketService: AppSocketService, private readonly notificationService: NotificationService) { }

  afterInit(): void {
    this.logger.log('Socket initialized');
  }

  // ********** Connection Events ********** //

  handleConnection(client: Socket) {

    // get headers
    const authorization = client.handshake.headers.authorization as string;

    if (authorization === 'esp8266') {
      this.socketService.registerEsp8266Client(client);
      this.socketService.notifyEsp8266State()
      this.notificationService.resetGlobalState();
      this.notificationService.emitGlobalState();
      this.logger.log(`ESP client connected: ${client.id}`);
      return
    }

    this.socketService.registerMobileClient(client);
    this.socketService.sendInitMobileData(client);
    this.notificationService.emitGlobalState(client);
    this.logger.log(`Mobile client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {

    const isEsp8266Client = this.socketService.isEsp8266Client(client);

    this.logger.log(`Client Type: ${isEsp8266Client ? 'esp8266' : 'mobile'} desconectado - ID: ${client.id}`);

    if (isEsp8266Client) {
      this.socketService.unregisterEsp8266Client(client);
      this.socketService.notifyEsp8266State()
      this.notificationService.resetGlobalState();
      this.notificationService.emitGlobalState();
      return
    }

    this.socketService.unregisterMobileClient(client);
  }


  // ********** ESP8266 Events ********** //

  @SubscribeMessage(AppEventType.LiveData)
  handleLivedata(client: Socket, payload: Omit<LiveDataEventPayload, 'timestamp'>): void {
    if (!this.socketService.isEsp8266Client(client)) return;

    this.notificationService.setGlobalState({ presence: payload.presence });

    const event: LiveDataEvent = {
      type: AppEventType.LiveData,
      payload: {
        ...payload,
        timestamp: new Date().toISOString()
      }
    }

    this.logger.log(`${AppEventType.LiveData} event received from ESP8266`);
    this.socketService.broadcastEventToMobileClients(event);
    this.notificationService.analyzeData(event); // analyze data to send notifications
  }


  @SubscribeMessage(AppEventType.Sync)
  handleSync(client: Socket, payload: SyncEventPayload): void {
    if (!this.socketService.isEsp8266Client(client)) return;

    this.notificationService.setGlobalState(payload);
    this.notificationService.emitGlobalState();

    this.logger.log(`${AppEventType.Sync} event received from ESP8266`);
  }

  // ********** Mobile Events ********** //

  @SubscribeMessage(AppEventType.LightChange)
  handleLightChange(client: Socket, event: LightChangeEvent): void {
    if (!this.socketService.isMobileClient(client)) return;
    this.logger.log(`${AppEventType.LightChange} event received from Mobile`);

    if (!this.notificationService.globalState.presence) {
      const notification: NotificationI = {
        message: 'No se puede cambiar el estado de la luz si no hay presencia, si estuviera encendida, esta automaticamente se apagará',
        type: 'error',
        timestamp: new Date().toISOString()
      }
      this.notificationService.emitNotification(notification);
      this.notificationService.saveNotification(notification);
      return
    }

    this.socketService.broadcastEventToEsp8266Clients({
      type: AppEventType.LightChange,
      payload: event.payload.is_light_on // just send the boolean value
    })
  }

  @SubscribeMessage(AppEventType.VentChange)
  handleVentChange(client: Socket, event: VentChangeEvent): void {
    if (!this.socketService.isMobileClient(client)) return;
    this.logger.log(`${AppEventType.VentChange} event received from Mobile`);

    this.socketService.broadcastEventToEsp8266Clients({
      type: AppEventType.VentChange,
      payload: event.payload.vent_state
    })
  }

}