import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class WeatherService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async testRedis() {
    await this.redisService.set('test', 'test');
    const result = await this.redisService.get('test');
    return result;
  }
}
