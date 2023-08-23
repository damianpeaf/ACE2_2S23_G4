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

@WebSocketGateway({ cors: true })
export class AppSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(AppSocketGateway.name);

  constructor(private readonly socketService: AppSocketService) { }


  afterInit(): void {
    console.log('Arduino socket initialized')
    this.logger.log('Arduino socket initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Arduino client connected: ${client.id}`);

    // Return the current state to sync DB and app
    client.emit('welcome', this.socketService.getHello());

  }

  handleDisconnect(client: Socket) {
    console.log({
      client: `Cliente desconectado ${client.id}`,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.io.emit('message', payload);
  }
}
