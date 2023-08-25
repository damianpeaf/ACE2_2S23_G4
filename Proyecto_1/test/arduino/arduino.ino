#include <SoftwareSerial.h>
SoftwareSerial mySUART(2, 3); // SRX = Din-2, STX = Dpin-3

void setup()
{
  Serial.begin(115200);
  mySUART.begin(115200);
}

void loop()
{
  // send something as 100;10;100;100;true\n

  String data = "100;10;100;100;true\n";

  for (int i = 0; i < data.length(); i++)
  {
    mySUART.write(data[i]);
  }

  delay(1000);
}