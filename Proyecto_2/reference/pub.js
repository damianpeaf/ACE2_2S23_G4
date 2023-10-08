const mqtt = require("mqtt");
//------------------------- pub ---------------------
const pub = mqtt.connect("mqtt://localhost:9000");

pub.on("connect", () => {
  pub.publish("iar_quality", "Hello from Node.js!");
  pub.end();
})

