const mqtt = require('mqtt')
const { createClient } = require('redis')
const { createTimeSerie } = require('./utils')
const express = require('express')
const { Analyzer } = require('./analyzer')
require('dotenv').config()

const useMosca = process.env.MOSCA == 1 ? true : false
console.log(`useMosca: ${useMosca}`)
const moscaUrl = 'mqtt://localhost:9000'

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
    await createTimeSerie(redisClient, 'lightOn')
    await createTimeSerie(redisClient, 'presence')
    await createTimeSerie(redisClient, 'humidity')
    await createTimeSerie(redisClient, 'light')
    await createTimeSerie(redisClient, 'co2')


    const client = mqtt.connect(useMosca ? moscaUrl : options)

    const analyzer = new Analyzer(client, redisClient)


    client.on('connect', () => {
        console.log('MQTT connected')

        client.subscribe('sensor-data')
        console.log('Subscribed to sensor-data')
    })

    client.on('message', async (topic, message) => {

        // convert message to JSON
        const timestamp = new Date().getTime()
        const data = JSON.parse(message.toString())
        data.presence = data.presence === 'true'
        data.timestamp = timestamp

        // store data in Redis, array of json objects with a timestamp
        await redisClient.ts.add('temperature', timestamp, data.temperature)
        await redisClient.ts.add('presence', timestamp, data.presence ? 1 : 0)
        await redisClient.ts.add('humidity', timestamp, data.humidity)
        await redisClient.ts.add('light', timestamp, data.lumen)
        await redisClient.ts.add('co2', timestamp, data.airQuality)

        redisClient.hSet('sensor-data', timestamp, JSON.stringify(data))

        // analyze data
        await analyzer.analyzeData(data)

        console.log({
            topic,
            data
        })
    })

    // setting cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        next()
    })

    app.get('/ledOff', async (req, res) => {
        client.publish('actuator-request', 'ledOff')
        analyzer.setGlobalState({
            is_light_on: false
        })
        await redisClient.ts.add('lightOn', new Date().getTime(), 0)
        return res.send('OK')
    })
    app.get('/fanOff', async (req, res) => {
        client.publish('actuator-request', 'fanOff')
        analyzer.setGlobalState({
            vent_state: 'off'
        })
        return res.send('OK')
    })
    app.get('/fanLow', async (req, res) => {
        client.publish('actuator-request', 'fanLow')
        analyzer.setGlobalState({
            vent_state: 'low'
        })
        return res.send('OK')
    })
    app.get('/fanHigh', async (req, res) => {
        client.publish('actuator-request', 'fanHigh')
        analyzer.setGlobalState({
            vent_state: 'high'
        })
        return res.send('OK')
    })
    app.get('/servoOpen', async (req, res) => {
        client.publish('actuator-request', 'servoOpen')
        // TODO: set global state
        return res.send('OK')

    })
    app.get('/servoClose', async (req, res) => {
        client.publish('actuator-request', 'servoClose')
        // TODO: set global state
        return res.send('OK')

    })

    app.get('/ledOn', async (req, res) => {
        client.publish('actuator-request', 'ledOn')
        analyzer.setGlobalState({
            is_light_on: true
        })
        await redisClient.ts.add('lightOn', new Date().getTime(), 1)
        return res.send('OK')
    })

    app.get('/reset', async (req, res) => {
        await analyzer.resetGlobalState()
        res.send('Reset')
        return res.send('OK')
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on http://127.0.0.1:${process.env.PORT || 3000} !`)
    })
}

init()
