#include <DHT.h>
#include <DHT_U.h>
#include <Servo.h>
// ----------------- Serial -----------------

// ----------------- DHT11 -----------------
#define DHTPIN 4

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// ----------------- LDR -----------------
#define LDRPIN A2

// ----------------- MQ135 -----------------
#define MQ135PIN A1

// ----------------- Ultrasonic -----------------
#define TRIGPIN 5
#define ECHOPIN 6

// State
bool isLightOn = false;
bool doorState = false;
bool prevDoorState = false;
int fanState = 0; // 0: off, 1: low, 2: high
int prevFanState = 0;

// Led pin on D7
const int ledPin = 7;

// fan pwm pin on d9
const int fanPin = 9;

// servo pin on d10
Servo servo;

unsigned long previousMillis = 0;

void setup()
{
  Serial.begin(115200);

  dht.begin();

  pinMode(LDRPIN, INPUT);
  pinMode(MQ135PIN, INPUT);

  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);

  // led
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // fan
  pinMode(fanPin, OUTPUT);
  analogWrite(fanPin, 0);
  
  // servo
  servo.attach(11);
  servoClose();

  Serial.println("Ready!");
}

void loop()
{

  // 1. stream sensor data, every 3 seconds
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= 3000)
  {
    previousMillis = currentMillis;
    sensorData();
  }

  // 2. check for commands
  readCommands();

  // 3. actuator control
  actuatorControl();
}

void fanOff()
{
  analogWrite(fanPin, 0);
}

void fanLow()
{
  analogWrite(fanPin, 150);
}

void fanHigh()
{
  analogWrite(fanPin, 255);
}

void ledOff()
{
  digitalWrite(ledPin, LOW);
}

void ledOn()
{
  digitalWrite(ledPin, HIGH);
}

void servoOpen()
{
  servo.write(1);
}

void servoClose()
{
  servo.write(89);
}

void sensorData()
{
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  int ldr = analogRead(LDRPIN);
  float lumen = 0.6633 * ldr + 0.0052;

  if (lumen < 0)
  {
    lumen = 0;
  }

  int airQuality = analogRead(MQ135PIN);

  // distance in cm
  digitalWrite(TRIGPIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGPIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGPIN, LOW);
  float distance = pulseIn(ECHOPIN, HIGH) / 58.2;

  String presence = "false";
  if (distance < 15)
  {
    presence = "true";
  }

  String data = String(temperature, 2) + ";" + String(humidity, 2) + ";" + String(airQuality) + ";" + String(lumen, 2) + ";" + presence;
  Serial.println(data);
}

void readCommands()
{
  if (Serial.available() > 0)
  {
    String command = Serial.readStringUntil('\n');

    if (command == "ledOn")
    {
      isLightOn = true;
    }
    else if (command == "ledOff")
    {
      isLightOn = false;
    }
    else if (command == "fanOff")
    {
      fanState = 0;
    }
    else if (command == "fanLow")
    {
      fanState = 1;
    }
    else if (command == "fanHigh")
    {
      fanState = 2;
    }
    else if (command == "servoOpen")
    {
      doorState = true;
    }
    else if (command == "servoClose")
    {
      doorState = false;
    }
  }
}

void actuatorControl()
{

  // light
  if (isLightOn)
  {
    ledOn();
  }
  else
  {
    ledOff();
  }

  // fan
  if (fanState != prevFanState)
  {
    if (fanState == 0)
    {
      fanOff();
    }
    else if (fanState == 1)
    {
      fanLow();
    }
    else if (fanState == 2)
    {
      fanHigh();
    }
    prevFanState = fanState;
  }

  // door
  if (doorState != prevDoorState)
  {
    if (doorState)
    {
      servoOpen();
    }
    else
    {
      servoClose();
    }
    prevDoorState = doorState;
  }
}