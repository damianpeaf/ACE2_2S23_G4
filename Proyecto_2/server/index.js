import mqtt from 'mqtt'
const options = {
    host: 'e97567f69db948879616b91506d2b620.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'damianpeaf',
    password: 'Grupo4arqui2'
}

const client = mqtt.connect(options);
client.on('connect', () => {
    console.log('MQTT connected')

    client.subscribe('sensor-data')
    console.log('Subscribed to sensor-data')
})

client.on('message', (topic, message) => {

    // convert message to JSON
    const data = JSON.parse(message.toString())

    console.log({
        topic,
        data
    })
})
