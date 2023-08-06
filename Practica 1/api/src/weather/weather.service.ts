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

  async uploadData(data: any) {
    const currentDate = new Date();
    const newKey = currentDate.toISOString();

    const result = await this.redisService.set(newKey, JSON.stringify(data));
    return result;
  }

  async getAlldata() {
    const keys = await this.redisService.keys('*');
    const result = await this.redisService.mget(keys);

    console.log(result);

    return {
      data: result.map((item, index) => {
        const date = new Date(keys[index]);

        // dia/mes/año hora:minutos:segundos
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return {
          ...JSON.parse(item),
          date: formattedDate,
        };
      }),
    };
  }

  async deleteData() {
    const keys = await this.redisService.keys('*');
    const result = await this.redisService.del(keys);
    return result;
  }
}
