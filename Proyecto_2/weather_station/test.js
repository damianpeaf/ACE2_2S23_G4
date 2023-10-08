import mqtt from 'mqtt'

const client = mqtt.connect('wss://mqtt-production-cb34.up.railway.app/mqtt')
client.on('connect', () => {
    console.log('MQTT connected')

    client.subscribe('actuator-request')
})

// recieve data
client.on('message', (topic, message) => {
    const msg = message.toString()
    console.log(topic, msg)
    if (topic === 'actuator-request') {
        port.write(`${msg}\n`)
    }
})
