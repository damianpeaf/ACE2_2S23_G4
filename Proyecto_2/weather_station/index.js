import { SerialPort, ReadlineParser } from 'serialport'
import mqtt from 'mqtt'

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
})


const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

client.on('connect', () => {
    console.log('MQTT connected')

    client.subscribe('actuator-request')
})

parser.on('open', () => {
    console.log('Arduino connected')
})

parser.on('error', (err) => {
    console.log(err)
})

// broadcast data
parser.on('data', (data) => {

    // temparature;humidity;airQuality;lumen;presence
    const [temparature, humidity, airQuality, lumen, presence] = data.split(';')

    const message = {
        temparature,
        humidity,
        airQuality,
        lumen,
        presence
    }
    console.log(message)

    client.publish('sensor-data', JSON.stringify(message))
})

// recieve data
client.on('message', (topic, message) => {
    const msg = message.toString()
    console.log(topic, msg)
    if (topic === 'actuator-request') {
        port.write(`${msg}\n`)
    }
})
