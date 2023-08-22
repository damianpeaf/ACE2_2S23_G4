import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly socketService: SocketService) { }


  afterInit(): void {
    console.log('Arduino socket initialized')
    this.logger.log('Arduino socket initialized');
  }

  handleConnection(client: Socket) {
    console.log('Arduino connected')
    this.logger.log(`Arduino client connected: ${client.id}`);
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

// Socket to handle communication with the app
// @WebSocketGateway({ cors: true, namespace: 'app' })
// export class AppSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() wss: Server;

//   constructor(private readonly appService: AppSocketService) { }

//   handleConnection(client: Socket) {
//     // When app connects, first time send the current state to sync DB and app
//     console.log('App connected')
//     this.wss.emit('message', this.appService.getHello());
//   }

//   handleDisconnect(client: Socket) {
//     console.log({
//       client: `Cliente desconectado ${client.id}`,
//     });
//   }

//   @SubscribeMessage('message')
//   handleMessage(client: Socket, payload: any): void {
//     this.wss.emit('message', payload);
//   }
// }
