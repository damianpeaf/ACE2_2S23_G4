import { Module } from '@nestjs/common';
import { AppSocketService } from './socket.service';
import { AppSocketGateway } from './socket.gateway';
import { NotificationService } from './notification/notification.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  providers: [AppSocketGateway, AppSocketService, NotificationService],
})
export class SocketModule { }
