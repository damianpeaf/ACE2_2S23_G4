import { Injectable, Logger } from '@nestjs/common';
import { AppSocketService } from '../socket.service';
import { LiveDataEvent } from '../interface';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { time } from 'console';

@Injectable()
export class NotificationService {

  // create a static to manage when the value is saved in redis to avoid save it again
  private saveOnceLight = false;
  private saveOnceAir = false;

  private readonly logger = new Logger(NotificationService.name);
  private readonly badAirQualityThreshold = 300; // in ppm

  constructor(private readonly socketService: AppSocketService, @InjectRedis() private readonly redisService: Redis) { }

  // test redis
  async testRedis() {
    await this.redisService.set('test', 'test')
    const test = await this.redisService.get('test')

    this.logger.log('testRedis')
  }

  // analyzeData
  analyzeData(event: LiveDataEvent) {
    this.logger.log('analyzeData')

    const { air_quality, light, presence, temperature, timestamp } = event.payload;

    // analyze light
    this.analyzeLight(timestamp, presence);
    // analyze air quality
    this.analyzeAirQuality(air_quality, timestamp);

  }


  analyzeLight(timestamp: string, presence: boolean) {
    if (!this.saveOnceLight) {
      // save the data as lightNotification: timestamp with 60 seconds of life
      this.redisService.set(`lightNotification`, JSON.stringify({ timestamp }), 'EX', 61)
      this.saveOnceLight = true;
    }

    // if presence is false -> evaluate if theye have passed 30 seconds
    // ! TODO: read from redis if the light is on or off
    if (!presence) {
      // get the last lightNotification from redis and compare the timestamp
      this.redisService.get('lightNotification', (err, result) => {
        if (err) {
          this.logger.error(err)
          return
        }
        // if the timestamp is equal 30 seconds -> do nothing
        if (result) {
          const { timestamp } = JSON.parse(result);
          const lastTimestamp = new Date(timestamp);
          const newTimeStamp = new Date(timestamp);
          const diff = newTimeStamp.getTime() - lastTimestamp.getTime();
          if (diff == 30000 || diff == 31000) {
            // TODO: send first notification and save it

          } else if (diff == 60000 || diff == 61000) {

            // TODO: emit to esp8266 to turn off the light
            // TODO: send second notification and save it
          }
        }
      })
    } else {
      // Delete the lightNotification from redis
      this.redisService.del('lightNotification')
      this.saveOnceLight = false;
    }
  }


  analyzeAirQuality(air_quality: number, timestamp: string) {
    if (!this.saveOnceAir) {
      // save the data as airNotification: timestamp with 60 seconds of life
      this.redisService.set(`airNotification`, JSON.stringify({ timestamp }), 'EX', 61)
      this.saveOnceAir = true;
    }

    // if air_quality > Threshold -> evaluate if theye have passed 30 seconds
    if (air_quality > this.badAirQualityThreshold) {
      // get the last airNotification from redis and compare the timestamp
      this.redisService.get('airNotification', (err, result) => {
        if (err) {
          this.logger.error(err)
          return
        }
        // if the timestamp is equal 30 seconds -> do nothing
        if (result) {
          const { timestamp } = JSON.parse(result);
          const lastTimestamp = new Date(timestamp);
          const newTimeStamp = new Date(timestamp);
          const diff = newTimeStamp.getTime() - lastTimestamp.getTime();
          if (diff == 30000 || diff == 31000) {
            // TODO: send first notification and save it

          } else if (diff == 60000 || diff == 61000) {

            // TODO: emit to esp8266 to turn off the light
            // TODO: send second notification and save it
          }
        }
      })
    } else {
      // Delete the airNotification from redis
      this.redisService.del('airNotification')
      this.saveOnceAir = false;
    }
  }



}
