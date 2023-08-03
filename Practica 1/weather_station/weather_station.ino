#include <DHT.h>
#include <DHT_U.h>


// ----------------- DHT11 -----------------
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// ----------------- LDR -----------------
#define LDRPIN A0

// ----------------- MQ135 -----------------
#define MQ135PIN A1



void setup() {
  Serial.begin(9600);

  dht.begin();

  pinMode(LDRPIN, INPUT);
  pinMode(MQ135PIN, INPUT);

}

void loop() {
  // Will be streamed temperature;humidity;air quality;light\n

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  int light = analogRead(LDRPIN);

  int airQuality = analogRead(MQ135PIN);

  Serial.println(String(temperature)+";"+String(humidity)+";"+String(airQuality)+";"+String(light));

  delay(1000);
}
