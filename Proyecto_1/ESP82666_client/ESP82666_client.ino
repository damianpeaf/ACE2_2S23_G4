
#include <ESP8266WiFi.h> // Include the Wi-Fi library
#include <ESP8266WiFiMulti.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>
#include <SoftwareSerial.h>

// Internet connection
const char *ssid = "CLARO1_8E2AAB";  // The SSID (name) of the Wi-Fi network you want to connect 2.4ghz!
const char *password = "841qlCREpc"; // The password of the Wi-Fi network

// WebSocket client
SocketIOclient socketIO;

// Serial communication
#define USE_SERIAL Serial
SoftwareSerial mySUART(4, 5); // D2, D1

// utils
unsigned long lastMillis = 0;
String serialStream = "";

// State
bool isLightOn = false;
int ventState = 0; // 0: off, 1: low, 2: high

// Led pin on D4
const int ledPin = 2;

// fan pwm pin on D5
const int fanPin = 14;

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
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
        processEvent(payload);
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

void processEvent(uint8_t *payload)
{
    DynamicJsonDocument doc(1024);
    deserializeJson(doc, payload);

    String r_event = doc[0];
    if (r_event == "light_change")
    {
        // light change event
        // [IOc] get event: ["light_change",true]
        bool isOn = doc[1];
        if (isOn != isLightOn)
        {
            isLightOn = isOn;
            digitalWrite(ledPin, isLightOn ? HIGH : LOW);
            USE_SERIAL.printf("[IOc] Light change: %s\n", isLightOn ? "on" : "off");
            mySUART.println(isLightOn ? "1" : "0");
        }
        sendGlobalState();
    }
    else if (r_event == "vent_change")
    {
        // vent change event
        // [IOc] get event: ["vent_change","off"]
        // [IOc] get event: ["vent_change","vel_1"]
        // [IOc] get event: ["vent_change","vel_2"]

        String v_state = doc[1];

        if (v_state == "off")
        {
            if (ventState != 0)
            {
                ventState = 0;
                USE_SERIAL.printf("[IOc] Vent change: %s\n", "off");
                mySUART.println("2");
            }
        }
        else if (v_state == "vel_1")
        {
            if (ventState != 1)
            {
                ventState = 1;
                USE_SERIAL.printf("[IOc] Vent change: %s\n", "vel_1");
                mySUART.println("3");
            }
        }
        else if (v_state == "vel_2")
        {
            if (ventState != 2)
            {
                ventState = 2;
                USE_SERIAL.printf("[IOc] Vent change: %s\n", "vel_2");
                mySUART.println("4");
            }
        }
        sendGlobalState();
    }
}

void sendGlobalState()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    array.add("global_state_sync");

    JsonObject param1 = array.createNestedObject();
    param1["is_light_on"] = isLightOn;

    if (ventState == 0)
    {
        param1["vent_state"] = "off";
    }
    else if (ventState == 1)
    {
        param1["vent_state"] = "vel_1";
    }
    else if (ventState == 2)
    {
        param1["vent_state"] = "vel_2";
    }

    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
}

void setup()
{
    // led
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, LOW);

    // fan
    pinMode(fanPin, OUTPUT);
    analogWrite(fanPin, 0);

    Serial.begin(115200); // Start the Serial communication to send messages to the computer
    mySUART.begin(115200);

    delay(10);
    Serial.println('\n');

    WiFi.begin(ssid, password); // Connect to the network
    Serial.print("Connecting to ");
    Serial.print(ssid);
    Serial.println(" ...");

    int i = 0;
    while (WiFi.status() != WL_CONNECTED)
    { // Wait for the Wi-Fi to connect
        delay(1000);
        Serial.print(++i);
        Serial.print(' ');
    }

    Serial.println('\n');
    Serial.println("Connection established!");
    Serial.print("IP address:\t");
    Serial.println(WiFi.localIP()); // Send the IP address of the ESP8266 to the computer

    socketIO.setExtraHeaders("Authorization: esp8266");

    //  socketIO.begin("192.168.1.2", 8880, "/socket.io/?EIO=4");
    socketIO.beginSSL("ace22s23g4-production.up.railway.app", 443, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);
    lastMillis = millis();

    // state reset
    isLightOn = false;
    ventState = 0;

    Serial.println("Setup ready!");
}

void loop()
{
    // fan speed
    if (ventState == 0)
    {
        analogWrite(fanPin, 0);
    }
    else if (ventState == 1)
    {
        analogWrite(fanPin, 512);
    }
    else if (ventState == 2)
    {
        analogWrite(fanPin, 1023);
    }

    socketIO.loop();

    if (mySUART.available() > 0)
    {
        char c = mySUART.read();

        if (c == '\n')
        {

            DynamicJsonDocument doc(1024);
            JsonArray array = doc.to<JsonArray>();
            array.add("live_data"); // event name

            JsonObject payload = array.createNestedObject();

            // Extract values from serial stream
            int index = 0;
            int lastIndex = 0;
            int count = 0;
            while (index != -1)
            {
                index = serialStream.indexOf(';', lastIndex);
                String value = serialStream.substring(lastIndex, index);
                switch (count)
                {
                case 0:
                    payload["temperature"] = value.toFloat();
                    break;
                case 1:
                    payload["humidity"] = value.toFloat();
                    break;
                case 2:
                    payload["air_quality"] = value.toInt();
                    break;
                case 3:
                    payload["light"] = value.toFloat();
                    break;
                case 4:
                    payload["presence"] = value == "true";
                    break;
                }
                lastIndex = index + 1;
                count++;
            }

            String output;
            serializeJson(doc, output);
            socketIO.sendEVENT(output); // send message to server

            // Serial.println("Sending live data event to server:");
            // Serial.println(output);

            serialStream = "";
        }
        else
        {
            serialStream += c;
        }
    }
}