// get mosca
const mosca = require("mosca");

const port = 9000;

const broker = new mosca.Server({
    port
});

// start broker
broker.on("ready", () => {
    console.log(`Broker is ready on port ${port}`)
})

// watch for new clients
broker.on("clientConnected", (client) => {
    console.log(`Client connected: ${client.id}`)
})

// watch for disconnections
broker.on("clientDisconnected", (client) => {
    console.log(`Client disconnected: ${client.id}`)
})

// on published message
broker.on("published", (packet, client) => {
    console.log(`Published: ${packet.payload}`)
})