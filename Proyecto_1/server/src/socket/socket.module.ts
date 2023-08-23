import { Module } from '@nestjs/common';
import { AppSocketService } from './socket.service';
import { AppSocketGateway } from './socket.gateway';

@Module({
  providers: [AppSocketGateway, AppSocketService],
})
export class SocketModule { }
