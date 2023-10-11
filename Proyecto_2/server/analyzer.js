class Analyzer {

    globalState = {
        is_light_on: false,
        vent_state: 'off',
        presence: false,
    };

    saveOnceLight = false;
    saveOnceAir = false;

    notificationState = {
        firstLightNotification: false,
        firstAirNotification: false,
        secondAirNotification: false,
    };

    badAirQualityThreshold = 300; // in ppm

    constructor(mqttClient, redisClient) {
        this.mqttClient = mqttClient;
        this.redisClient = redisClient;
    }

    async resetGlobalState() {
        // reset the global state
        this.globalState = {
            is_light_on: false,
            vent_state: 'off',
            presence: false,
        };
        this.notificationState = {
            firstLightNotification: false,
            firstAirNotification: false,
            secondAirNotification: false,
        };
        await this.redisClient.del('lightNotification');
        await this.redisClient.del('airNotification');
    }

    setGlobalState(incomingState) {
        if (incomingState.is_light_on !== undefined && incomingState.is_light_on !== this.globalState.is_light_on)
            this.globalState.is_light_on = incomingState.is_light_on;

        if (incomingState.vent_state !== undefined && incomingState.vent_state !== this.globalState.vent_state)
            this.globalState.vent_state = incomingState.vent_state;

        if (incomingState.presence !== undefined && incomingState.presence !== this.globalState.presence)
            this.globalState.presence = incomingState.presence;

        console.log('Global state updated');
    }

    async analyzeData(data) {
        try {
            // analyze light
            await this.analyzeLight(data);
            // analyze air quality
            await this.analyzeAirQuality(data);
        } catch (error) {
            console.log(error)
        }
    }

    emitNotification(notification) {
        this.mqttClient.publish('notification', JSON.stringify(notification));
    }

    async saveNotification(notification) {
        await this.redisClient.lPush(
            'notifications',
            JSON.stringify(notification)
        );
        console.log('Notification saved');
    }

    async analyzeLight(data) {
        // if presence is false -> evaluate if theye have passed 30 seconds
        const { is_light_on } = this.globalState;
        const { presence } = data;

        // if there is no presence and the light is on -> evaluate if they have passed 30 seconds
        if (!presence && is_light_on) {
            if (!this.saveOnceLight) {
                // save the data as lightNotification: timestamp with 60 seconds of life
                await this.redisClient.set(
                    `lightNotification`,
                    JSON.stringify({ timestamp }),
                    'EX',
                    75,
                );
                this.saveOnceLight = true;
                return;
            }

            // get the last lightNotification from redis and compare the timestamp
            try {
                const result = await this.redisClient.get('lightNotification');
                if (!!result) {
                    const { timestamp } = JSON.parse(result);
                    const lastTimestamp = new Date(timestamp);
                    const newTimeStamp = new Date();
                    const diff = newTimeStamp.getTime() - lastTimestamp.getTime();

                    if (
                        diff >= 25_000 &&
                        diff < 50_000 &&
                        !this.notificationState.firstLightNotification
                    ) {
                        const notification = {
                            message: `La luz se ha quedado encendida sin presencia humana por más de 25 segundos. Temperatura: ${temperature}°C, Calidad del aire: ${air_quality} ppm, Luz: ${light} lux, Presencia: ${presence ? 'Si' : 'No'
                                }`,
                            timestamp: new Date().toISOString(),
                            type: 'warning',
                        };

                        this.emitNotification(notification);
                        await this.saveNotification(notification);

                        this.notificationState.firstLightNotification = true;

                        console.log('1st Light notification sent');
                    } else if (diff >= 50_000) {
                        const notification = {
                            message: `La luz se ha quedado encendida sin presencia humana por más de 50 segundos, se apagará automáticamente. Temperatura: ${temperature}°C, Calidad del aire: ${air_quality} ppm, Luz: ${light} lux, Presencia: ${presence ? 'Si' : 'No'
                                }`,
                            timestamp: new Date().toISOString(),
                            type: 'error',
                        };

                        this.emitNotification(notification);
                        await this.saveNotification(notification);

                        // Notification cycle finished
                        this.saveOnceLight = false;
                        await this.redisClient.del('lightNotification');
                        this.notificationState.firstLightNotification = false;

                        this.mqttClient.publish('actuator-request', 'ledOff')

                        console.log('2nd Light notification sent');
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            // Delete the lightNotification from redis
            await this.redisClient.del('lightNotification');
            this.saveOnceLight = false;
            this.notificationState.firstLightNotification = false;
        }
    }

    async analyzeAirQuality(data) {
        const { temperature, air_quality, light, presence } = data;

        if (this.notificationState.secondAirNotification) {
            if (air_quality > this.badAirQualityThreshold) return;

            const notification = {
                message: `La calidad del aire se ha restablecido. Temperatura: ${temperature}°C, Calidad del aire: ${air_quality} ppm, Luz: ${light} lux, Presencia: ${presence ? 'Si' : 'No'
                    }`,
                timestamp: new Date().toISOString(),
                type: 'info',
            };

            //   Turn off the vent
            this.mqttClient.publish('actuator-request', 'fanOff')

            this.emitNotification(notification);
            await this.saveNotification(notification);
            this.notificationState.secondAirNotification = false;
        }

        // if air_quality > Threshold -> evaluate if theye have passed 30 seconds
        if (air_quality > this.badAirQualityThreshold) {
            if (!this.saveOnceAir) {
                // save the data as airNotification: timestamp with 60 seconds of life
                await this.redisClient.set(
                    `airNotification`,
                    JSON.stringify({ timestamp }),
                    'EX',
                    75,
                );
                this.saveOnceAir = true;
                return;
            }

            // get the last airNotification from redis and compare the timestamp
            try {
                const result = await this.redisClient.get('airNotification');
                if (!!result) {
                    const { timestamp } = JSON.parse(result);
                    const lastTimestamp = new Date(timestamp);
                    const newTimeStamp = new Date();
                    const diff = newTimeStamp.getTime() - lastTimestamp.getTime();

                    if (
                        diff >= 10_000 &&
                        diff < 20_000 &&
                        !this.notificationState.firstAirNotification
                    ) {
                        const notification = {
                            message: `La calidad del aire es mala de manera sostendida por más de 10 segundos. Temperatura: ${temperature}°C, Calidad del aire: ${air_quality} ppm, Luz: ${light} lux, Presencia: ${presence ? 'Si' : 'No'
                                }`,
                            timestamp: new Date().toISOString(),
                            type: 'warning',
                        };

                        this.emitNotification(notification);
                        await this.saveNotification(notification);
                        this.notificationState.firstAirNotification = true;

                        console.log('1st Air notification sent');
                    } else if (diff >= 20_000) {
                        const notification = {
                            message: `La calidad del aire es mala, de manera sostendida por más de 20 segundos, se prenderá el ventilador automáticamente. Temperatura: ${temperature}°C, Calidad del aire: ${air_quality} ppm, Luz: ${light} lux, Presencia: ${presence ? 'Si' : 'No'
                                }`,
                            timestamp: new Date().toISOString(),
                            type: 'error',
                        };

                        this.emitNotification(notification);
                        await this.saveNotification(notification);

                        // Notification cycle finished
                        this.saveOnceAir = false;
                        this.redisClient.del('airNotification');
                        this.notificationState.firstAirNotification = false;

                        this.mqttClient.publish('actuator-request', 'fanHigh')
                        console.log('2nd Air notification sent');

                        this.notificationState.secondAirNotification = true;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            // Delete the airNotification from redis
            this.saveOnceAir = false;
            this.redisClient.del('airNotification');
            this.notificationState.firstAirNotification = false;
        }
    }
}

module.exports = {
    Analyzer
}