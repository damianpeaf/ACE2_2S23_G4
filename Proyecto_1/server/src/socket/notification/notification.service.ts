import { Injectable } from '@nestjs/common';
import { AppSocketService } from '../socket.service';
import { LiveDataEvent } from 'interfaces';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class NotificationService {

  constructor(private readonly socketService: AppSocketService, @InjectRedis() private readonly redisService: Redis) { }

  // test redis
  async testRedis() {
    await this.redisService.set('test', 'test')
    const test = await this.redisService.get('test')

    console.log('testRedis', test)
  }


  // analyzeData
  analyzeData(payload: LiveDataEvent) {
    console.log('analyzeData', payload)
  }

}
