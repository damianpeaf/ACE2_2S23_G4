import { Injectable, Logger } from '@nestjs/common';
import { AppSocketService } from '../socket.service';
import { AppEventType, LiveDataEvent, NotificationI, SyncEvent, VentState } from '../interface';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { time } from 'console';
import { async } from 'rxjs';
import { Socket } from 'socket.io';

interface GlobalStateI {
  is_light_on: boolean,
  vent_state: VentState
}

interface NotificationStateI {
  firstLightNotification: boolean;
  secondLightNotification: boolean;
  firstAirNotification: boolean;
  secondAirNotification: boolean;
}

@Injectable()
export class NotificationService {

  private readonly logger = new Logger(NotificationService.name);

  private saveOnceLight = false;
  private saveOnceAir = false;
  private globalState: GlobalStateI = { is_light_on: false, vent_state: 'off' };
  private notificationState: NotificationStateI = {
    firstLightNotification: false,
    secondLightNotification: false,
    firstAirNotification: false,
    secondAirNotification: false
  };
  private readonly badAirQualityThreshold = 300; // in ppm

  constructor(private readonly socketService: AppSocketService, @InjectRedis() private readonly redisService: Redis) { }

  resetGlobalState() {
    // reset the global state
    this.globalState = { is_light_on: false, vent_state: 'off' };
    this.notificationState = { firstLightNotification: false, secondLightNotification: false, firstAirNotification: false, secondAirNotification: false };
    this.redisService.del('lightNotification')
    this.redisService.del('airNotification')
  }

  setGlobalState(incomingState: Partial<GlobalStateI>) {

    if (incomingState.is_light_on !== undefined && incomingState.is_light_on !== this.globalState.is_light_on) {
      this.globalState.is_light_on = incomingState.is_light_on
    }

    if (incomingState.vent_state !== undefined && incomingState.vent_state !== this.globalState.vent_state) {
      this.globalState.vent_state = incomingState.vent_state;
    }

    this.logger.log('Global state updated')
  }

  // ********** Notification Procedures ********** //

  emitNotification(notification: NotificationI) {
    this.socketService.broadcastEventToMobileClients({
      type: AppEventType.Notification,
      payload: notification
    })
  }

  emitGlobalState(client?: Socket) {

    const event: SyncEvent = {
      type: AppEventType.Sync,
      payload: {
        ...this.globalState
      }
    }

    if (client) {
      client.emit(AppEventType.Sync, event)
      return
    }

    this.socketService.broadcastEventToMobileClients(event)

  }

  saveNotification(notification: NotificationI) {
    this.redisService.lpush('notifications', JSON.stringify(notification), (err, result) => {
      if (err) {
        this.logger.error(err)
        return
      }
      this.logger.log('Notification saved')
    })
  }

  // ********** Data analysis ********** //

  // analyzeData
  analyzeData(event: LiveDataEvent) {
    this.logger.log('analyzeData')

    const { air_quality, light, presence, temperature, timestamp } = event.payload;

    // analyze light
    this.analyzeLight(timestamp, presence);
    // analyze air quality
    this.analyzeAirQuality(air_quality, timestamp);

  }

  async analyzeLight(timestamp: string, presence: boolean) {
    if (!this.saveOnceLight) {
      // save the data as lightNotification: timestamp with 60 seconds of life
      this.redisService.set(`lightNotification`, JSON.stringify({ timestamp }), 'EX', 61)
      this.saveOnceLight = true;
    }

    // if presence is false -> evaluate if theye have passed 30 seconds
    const { is_light_on } = this.globalState;

    // if there is no presence and the light is on -> evaluate if they have passed 30 seconds
    if (!presence && is_light_on) {
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
          if ((diff >= 30000 || diff < 60000) && !this.notificationState.firstLightNotification) {

            const notification: NotificationI = {
              message: 'La luz se ha quedado encendida sin presencia humana por más de 30 segundos',
              timestamp: new Date().toISOString(),
              type: 'warning'
            }

            this.emitNotification(notification);
            this.saveNotification(notification);

          } else if (diff >= 60000 && !this.notificationState.secondLightNotification) {

            const notification: NotificationI = {
              message: 'La luz se ha quedado encendida sin presencia humana por más de 60 segundos, se apagará automáticamente',
              timestamp: new Date().toISOString(),
              type: 'error'
            }

            this.emitNotification(notification);
            this.saveNotification(notification);

            // Notification cycle finished
            this.notificationState.firstLightNotification = false;
            this.notificationState.secondLightNotification = false;

            // TODO: emit to esp8266 to turn off the light
            // this.socketService.broadcastEventToEsp8266Client
          }
        }
      })
    } else {
      // Delete the lightNotification from redis
      this.redisService.del('lightNotification')
      this.saveOnceLight = false;
      this.notificationState.firstLightNotification = false;
      this.notificationState.secondLightNotification = false;
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

          if ((diff >= 30000 || diff < 60000) && !this.notificationState.firstAirNotification) {

            const notification: NotificationI = {
              message: 'La calidad del aire es mala, de manera sostendida por más de 30 segundos',
              timestamp: new Date().toISOString(),
              type: 'warning'
            }

            this.emitNotification(notification);
            this.saveNotification(notification);

          } else if (diff >= 60000 && !this.notificationState.secondAirNotification) {

            const notification: NotificationI = {
              message: 'La calidad del aire es mala, de manera sostendida por más de 60 segundos, se prenderá el ventilador automáticamente',
              timestamp: new Date().toISOString(),
              type: 'error'
            }

            this.emitNotification(notification);
            this.saveNotification(notification);

            // Notification cycle finished
            this.notificationState.firstAirNotification = false;
            this.notificationState.secondAirNotification = false;

            // TODO: emit to esp8266 to turn on the fan

          }
        }
      })
    } else {
      // Delete the airNotification from redis
      this.redisService.del('airNotification')
      this.saveOnceAir = false;
      this.notificationState.firstAirNotification = false;
      this.notificationState.secondAirNotification = false;
    }
  }

}