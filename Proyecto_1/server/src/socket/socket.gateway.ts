import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppSocketService, SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: 'arduino' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly socketService: SocketService) { }

  handleConnection(client: Socket) {
    console.log({
      client: `Cliente conectado ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log({
      client: `Cliente desconectado ${client.id}`,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.wss.emit('message', payload);
  }
}

// Socket to handle communication with the app
@WebSocketGateway({ cors: true, namespace: 'app' })
export class AppSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly appService: AppSocketService) { }

  handleConnection(client: Socket) {
    // When app connects, first time send the current state to sync DB and app
    this.wss.emit('message', this.appService.getHello());
  }

  handleDisconnect(client: Socket) {
    console.log({
      client: `Cliente desconectado ${client.id}`,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.wss.emit('message', payload);
  }
}
