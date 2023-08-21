import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly socketService: SocketService) {}

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
