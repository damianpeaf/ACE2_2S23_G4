import mqtt from 'mqtt'

const client = mqtt.connect('wss://ace2-g4-broker.up.railway.app/mqtt')
client.on('connect', () => {
    console.log('MQTT connected')

    client.subscribe('sensor-data')
    console.log('Subscribed to sensor-data')
})

client.on('sensor-data', (topic, message) => {
    console.log({
        topic,
        message
    })
})
