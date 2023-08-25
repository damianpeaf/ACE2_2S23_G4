#include <DHT.h>
#include <DHT_U.h>

// ----------------- Serial -----------------

// ----------------- DHT11 -----------------
#define DHTPIN 4
#include <SoftwareSerial.h>
SoftwareSerial mySUART(2, 3); // SRX = Din-2, STX = Dpin-3

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// ----------------- LDR -----------------
#define LDRPIN A0

// ----------------- MQ135 -----------------
#define MQ135PIN A1

// ----------------- Ultrasonic -----------------
#define TRIGPIN 5
#define ECHOPIN 6

void setup()
{
  Serial.begin(115200);
  mySUART.begin(115200);

  dht.begin();

  pinMode(LDRPIN, INPUT);
  pinMode(MQ135PIN, INPUT);

  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);

  Serial.println("Ready!");
}

void loop()
{

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  int ldr = analogRead(LDRPIN);
  float lumen = -1.8742 * ldr + 1702.3;

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

  // String output = String(temperature) + ";" + String(humidity) + ";" + String(airQuality) + ";" + String(lumen) + ";" + presence;
  // format string with fixed length of bytes
  String data = String(temperature, 2) + ";" + String(humidity, 2) + ";" + String(airQuality) + ";" + String(lumen, 2) + ";" + presence + "\n";

  for (int i = 0; i < data.length(); i++)
  {
    mySUART.write(data[i]);
  }

  delay(1500);
}
