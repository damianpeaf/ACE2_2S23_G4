const mqtt = require('mqtt')
const { createClient } = require('redis')
const { createTimeSerie } = require('./utils')
const express = require('express')
const { Analyzer } = require('./analyzer')

const init = async () => {
    const app = express()

    const redisClient = createClient({
        url: 'redis://default:7A82y2At236JpCJoLb6nUNmeUJAp15On@redis-12048.c1.us-east1-2.gce.cloud.redislabs.com:12048',
        socket: {
            connectTimeout: 50000
        }
    })

    await redisClient.connect()

    const options = {
        host: 'e97567f69db948879616b91506d2b620.s2.eu.hivemq.cloud',
        port: 8883,
        protocol: 'mqtts',
        username: 'damianpeaf',
        password: 'Grupo4arqui2'
    }

    await createTimeSerie(redisClient, 'temperature')
    await createTimeSerie(redisClient, 'humidity')
    await createTimeSerie(redisClient, 'light')
    await createTimeSerie(redisClient, 'co2')


    const client = mqtt.connect(options);

    const analyzer = new Analyzer(client, redisClient)


    client.on('connect', () => {
        console.log('MQTT connected')

        client.subscribe('sensor-data')
        console.log('Subscribed to sensor-data')
    })

    client.on('message', async (topic, message) => {

        // convert message to JSON
        const timestamp = new Date().toISOString()
        const data = JSON.parse(message.toString())
        data.presence = data.presence === 'true'
        data.timestamp = timestamp

        // store data in Redis, array of json objects with a timestamp
        await redisClient.ts.add('temperature', timestamp, data.temperature)

        redisClient.hSet('sensor-data', timestamp, JSON.stringify(data))

        // analyze data
        await analyzer.analyzeData(data)

        console.log({
            topic,
            data
        })
    })


    app.get('/ledOff', async (req, res) => {
        client.publish('actuator-request', 'ledOff')
        analyzer.setGlobalState({
            is_light_on: false
        })
    })
    app.get('/fanOff', async (req, res) => {
        client.publish('actuator-request', 'fanOff')
        analyzer.setGlobalState({
            vent_state: 'off'
        })
    })
    app.get('/fanLow', async (req, res) => {
        client.publish('actuator-request', 'fanLow')
        analyzer.setGlobalState({
            vent_state: 'low'
        })
    })
    app.get('/fanHigh', async (req, res) => {
        client.publish('actuator-request', 'fanHigh')
        analyzer.setGlobalState({
            vent_state: 'high'
        })
    })
    app.get('/servoOpen', async (req, res) => {
        client.publish('actuator-request', 'servoOpen')
        // TODO: set global state
    })
    app.get('/servoClose', async (req, res) => {
        client.publish('actuator-request', 'servoClose')
        // TODO: set global state
    })

    app.get('/ledOn', async (req, res) => {
        client.publish('actuator-request', 'ledOn')
        analyzer.setGlobalState({
            is_light_on: true
        })
    })

    app.get('/ledOff', async (req, res) => {
        client.publish('actuator-request', 'ledOff')
        analyzer.setGlobalState({
            is_light_on: false
        })
    })

    app.get('/reset', async (req, res) => {
        await analyzer.resetGlobalState()
        res.send('Reset')
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on http://127.0.0.1:${process.env.PORT || 3000} !`)
    })
}

init()
