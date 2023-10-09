import mqtt from 'mqtt';

const options = {
    host: 'e97567f69db948879616b91506d2b620.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'damianpeaf',
    password: 'Grupo4arqui2'
}

const client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');