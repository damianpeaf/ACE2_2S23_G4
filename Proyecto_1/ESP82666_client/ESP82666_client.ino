
#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266WiFiMulti.h>
#include <Arduino.h>
#include <ArduinoJson.h>
const char* ssid     = "CLARO1_8E2AAB";         // The SSID (name) of the Wi-Fi network you want to connect 2.4ghz!
const char* password = "841qlCREpc";     // The password of the Wi-Fi network

#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>
SocketIOclient socketIO;
#define USE_SERIAL Serial

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
  switch(type) {
      case sIOtype_DISCONNECT:
          USE_SERIAL.printf("[IOc] Disconnected!\n");
          break;
      case sIOtype_CONNECT:
          USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

          // join default namespace (no auto join in Socket.IO V3)
          socketIO.send(sIOtype_CONNECT, "/");
          break;
      case sIOtype_EVENT:
          USE_SERIAL.printf("[IOc] get event: %s\n", payload);
          break;
      case sIOtype_ACK:
          USE_SERIAL.printf("[IOc] get ack: %u\n", length);
          hexdump(payload, length);
          break;
      case sIOtype_ERROR:
          USE_SERIAL.printf("[IOc] get error: %u\n", length);
          hexdump(payload, length);
          break;
      case sIOtype_BINARY_EVENT:
          USE_SERIAL.printf("[IOc] get binary: %u\n", length);
          hexdump(payload, length);
          break;
      case sIOtype_BINARY_ACK:
          USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
          hexdump(payload, length);
          break;
  }
}
void setup() {
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');

  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  //put your server ip address
    socketIO.begin("192.168.1.2", 8880, "/socket.io/?EIO=4");
    // socketIO.begin("echo.websocket.org", 80, "/");


    // event handler
    socketIO.onEvent(socketIOEvent);

}

void loop() { 
    socketIO.loop();
  //
  }