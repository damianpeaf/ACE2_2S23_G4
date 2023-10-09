import { SerialPort, ReadlineParser } from 'serialport'
import mqtt from 'mqtt'

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
})


const options = {
    host: 'e97567f69db948879616b91506d2b620.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'damianpeaf',
    password: 'Grupo4arqui2'
}

const client = mqtt.connect(options);
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

parser.on('open', () => {
    console.log('Arduino connected')
})

parser.on('error', (err) => {
    console.log(err)
})

// broadcast data
parser.on('data', (data) => {

    // temparature;humidity;airQuality;lumen;presence
    const [temperature, humidity, airQuality, lumen, presence] = data.split(';')

    const message = {
        temperature,
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

client.subscribe('actuator-request');
