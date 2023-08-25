import { Injectable, Logger } from '@nestjs/common';
import { AppSocketService } from '../socket.service';
import { LiveDataEvent } from '../interface';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { time } from 'console';

@Injectable()
export class NotificationService {

  // create a static to manage when the value is saved in redis to avoid save it again
  private static saveOnceLight = false;
  private static saveOnceAir = false;

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

    const {air_quality,light,presence,temperature,timestamp} = payload.payload;

    // analyze light
    this.analyzeLight(timestamp, presence);
    // analyze air quality
    this.analyzeAirQuality(air_quality, timestamp);
    
  }


  analyzeLight(timestamp: string, presence: boolean) {
    if (!NotificationService.saveOnceLight) {
      // save the data as lightNotification: timestamp with 60 seconds of life
      this.redisService.set(`lightNotification`, JSON.stringify({timestamp}), 'EX', 61)
      NotificationService.saveOnceLight = true;
    }
    
    // if presence is false -> evaluate if theye have passed 30 seconds
    if (!presence) {
      // get the last lightNotification from redis and compare the timestamp
      this.redisService.get('lightNotification', (err, result) => {
        if (err) {
          this.logger.error(err)
          return
        }
        // if the timestamp is equal 30 seconds -> do nothing
        if (result) {
          const {timestamp} = JSON.parse(result);
          const lastTimestamp = new Date(timestamp);
          const newTimeStamp = new  Date(timestamp);
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
      NotificationService.saveOnceLight = false;
    }
  }


  analyzeAirQuality(air_quality: number, timestamp: string) {
    if (!NotificationService.saveOnceAir) {
      // save the data as airNotification: timestamp with 60 seconds of life
      this.redisService.set(`airNotification`, JSON.stringify({timestamp}), 'EX', 61)
      NotificationService.saveOnceAir = true;
    }
    
    // if air_quality > 20 -> evaluate if theye have passed 30 seconds
    if (air_quality > 20) {
      // get the last airNotification from redis and compare the timestamp
      this.redisService.get('airNotification', (err, result) => {
        if (err) {
          this.logger.error(err)
          return
        }
        // if the timestamp is equal 30 seconds -> do nothing
        if (result) {
          const {timestamp} = JSON.parse(result);
          const lastTimestamp = new Date(timestamp);
          const newTimeStamp = new  Date(timestamp);
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
      NotificationService.saveOnceAir = false;
    }
  }

  

}
