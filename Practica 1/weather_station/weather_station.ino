void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  // Will be streamed temperature;humidity;air quality;light\n
  Serial.println("25;50;100;1000");
  delay(1000);
}
