import { Injectable, Logger } from '@nestjs/common';
import { AppSocketService } from '../socket.service';
import { LiveDataEvent } from '../interface';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class NotificationService {

  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly socketService: AppSocketService, @InjectRedis() private readonly redisService: Redis) { }

  // test redis
  async testRedis() {
    await this.redisService.set('test', 'test')
    const test = await this.redisService.get('test')

    this.logger.log('testRedis')
  }

  // analyzeData
  analyzeData(payload: LiveDataEvent) {
    this.logger.log('analyzeData')
  }

}
