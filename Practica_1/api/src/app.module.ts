import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { envConfiguration } from './config/app.config';

@Module({
  imports: [
    WeatherModule,
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('redisHost'),
          port: configService.get('redisPort'),
          password: configService.get('redisPassword'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
