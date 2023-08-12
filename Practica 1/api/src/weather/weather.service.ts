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
    await this.redisService.set(newKey, JSON.stringify(data));

    const dia = currentDate.getDate().toString().padStart(2, '0');
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const anio = currentDate.getFullYear();
    const hora = currentDate.getHours().toString().padStart(2, '0');
    const minutos = currentDate.getMinutes().toString().padStart(2, '0');
    const segundos = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;

    return {
      ...data,
      date: formattedDate,
    };
  }

  async getAlldata() {
    const keys = await this.redisService.keys('*');

    if (keys.length === 0) {
      return {
        data: [],
      };
    }

    const result = await this.redisService.mget(keys);

    console.log(result);

    // last 5 elements
    // filter by date
    return {
      data: result
        .map((item, index) => {
          const date = new Date(keys[index]);

          // dia/mes/año hora:minutos:segundos, 1 will be 01

          const dia = date.getDate().toString().padStart(2, '0');
          const mes = (date.getMonth() + 1).toString().padStart(2, '0');
          const anio = date.getFullYear();
          const hora = date.getHours().toString().padStart(2, '0');
          const minutos = date.getMinutes().toString().padStart(2, '0');
          const segundos = date.getSeconds().toString().padStart(2, '0');

          const formattedDate = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;

          return {
            ...JSON.parse(item),
            date: formattedDate,
          };
        })
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          return dateA.getTime() - dateB.getTime();
        })
        .slice(-14),
    };
  }

  async deleteData() {
    const keys = await this.redisService.keys('*');
    const result = await this.redisService.del(keys);
    return result;
  }
}
