const mqtt = require("mqtt");
//---------------------------------sub----------------------------------------------------

const TopicSub = "iar_quality";

const sub = mqtt.connect("mqtt://localhost:9000");

sub.on("connect", () => {
  sub.subscribe(TopicSub);
});

sub.on("message", (topic, message) => {
  console.log("SUB:: topicSub: ", TopicSub, "  msj: ", message.toString());
});