#include <SoftwareSerial.h>
SoftwareSerial mySUART(4, 5); // D2, D1
String data = "";

void setup()
{
  Serial.begin(115200);
  mySUART.begin(115200);
}

void loop()
{

  if (mySUART.available() > 0)
  {
    char c = mySUART.read();

    if (c == '\n')
    {
      Serial.println(data);
      data = "";
    }
    else
    {
      data += c;
    }
  }
}