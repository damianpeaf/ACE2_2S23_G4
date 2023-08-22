import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RedisModule } from '@liaoliaots/nestjs-redis';

import { envConfiguration } from './config/app.config';
import { SocketService } from './socket/socket.service';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
    // RedisModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     config: {
    //       host: configService.get('redisHost'),
    //       port: configService.get('redisPort'),
    //       password: configService.get('redisPassword'),
    //     },
    //   }),
    // }),
    SocketModule,
  ],
  controllers: [],
  providers: [SocketService],
})
export class AppModule { }
