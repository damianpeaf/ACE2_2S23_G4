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
import { AppEventType, InitEvent, SyncEventPayload } from './interfaces/events';

@WebSocketGateway({ cors: true })
export class AppSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(AppSocketGateway.name);

  constructor(private readonly socketService: AppSocketService) { }


  afterInit(): void {
    // console.log('Arduino socket initialized')
    this.logger.log('Arduino socket initialized');
  }

  handleConnection(client: Socket) {

    // get headers
    const authorization = client.handshake.headers.authorization as string;

    this.logger.log({
      client: `Cliente conectado ${client.id} - Tipo: ${JSON.stringify(client.handshake.headers)}`,
    });

    if (authorization === 'esp8266') {
      this.socketService.registerEsp8266Client(client);
      this.socketService.notifyEsp8266State()
      this.logger.log(`ESP client connected: ${client.id}`);
      return
    }

    this.socketService.registerMobileClient(client);
    this.socketService.sendInitMobileData(client);
    this.logger.log(`Mobile client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {

    const isEsp8266Client = this.socketService.isEsp8266Client(client);

    this.logger.log({
      client: `Cliente desconectado ${client.id} - Tipo: ${isEsp8266Client ? 'esp8266' : 'mobile'}`,
    });

    if (isEsp8266Client) {
      this.socketService.unregisterEsp8266Client(client);
      this.socketService.notifyEsp8266State()
      return
    }

    this.socketService.unregisterMobileClient(client);
  }

  @SubscribeMessage(AppEventType.Sync)
  handleSync(client: Socket, payload: SyncEventPayload): void {
    if (!this.socketService.isEsp8266Client(client)) return;
    this.socketService.notifySyncEvent(payload);
    this.logger.log({
      client: `Sync event received from ${client.id}`,
      payload
    });
  }
}
