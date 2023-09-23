---
title: Código de Arduino
---

### Métodos relevantes

#### setup()

El método setup() es el primer método que se ejecuta al iniciar el programa. En este método se deben inicializar los pines que se van a utilizar y se debe inicializar la comunicación serial.

```cpp
void setup()
{
  Serial.begin(115200);

  dht.begin();

  pinMode(LDRPIN, INPUT);
  pinMode(MQ135PIN, INPUT);

  pinMode(TRIGPIN, OUTPUT);
  pinMode(ECHOPIN, INPUT);

  Serial.println("Ready!");
}
```

#### loop()

El método loop() es el segundo método que se ejecuta al iniciar el programa. En este método se debe realizar la lectura de los sensores y se debe enviar la información a través de la comunicación serial. Así como de recibir instrucciones para el cambio de las variables de estado que actuan directamente sobre el ventilador y la puerta.

```cpp
void loop()
{

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  int ldr = analogRead(LDRPIN);
  float lumen = 0.6633 * ldr +0.0052;

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

  String data = String(temperature, 2) + ";" + String(humidity, 2) + ";" + String(airQuality) + ";" + String(lumen, 2) + ";" + presence + "\n";

  for (int i = 0; i < data.length(); i++)
  {
    mySUART.write(data[i]);
  }

}
```	

Cabe resaltar, que la información es enviada como una sola "tira" de caracteres, por lo que es necesario separar los valores en el programa que recibe la información por algun delimitador. En este caso, el delimitador es el caracter `\n`.

Asi mismo, queda un canal abierto para la recepción de información, por lo que es posible enviar instrucciones al Arduino para cambiar el estado de los actuadores. Es posible entonces implementar algo como lo siguiente:

```cpp	

if (mySUART.available() > 0)
{
    char c = mySUART.read();

    if (c == '\n')
    {
        // ... codigo de terminación de instrucción
        serialStream = "";
    }
    else
    {
        serialStream += c;
    }
}
```

### Evitar el bloqueo del programa

Si bien lo sistemas actuales dan la impresión de realizar multiples acciones al mismo tiempo, las implementaciones sobre hardware terminan siendo totalmente secuenciales. Resulta entonces indispensable evitar aquellas instrucciones que resultan bloqueantes para la ejecución del programa, un ejemplo podría ser el uso de la función `delay()`.

Podemos utilizar las siguiente técnica para evitar el bloqueo del programa:

1. Uso de la función `millis()` para obtener el tiempo transcurrido desde que se inició el programa.

Si por ejemplo quisieramos realizar la medición de datos de los sensores cada cierto tiempo un primer acercamiento sería colocar una instrucción `delay()` al finalizar con la toma de datos. Sin embargo, esto bloquearía (por ejemplo) el control que tiene el sistema sobre el ventilador, ya que debería esperar a que se termine el tiempo de espera para poder realizar la siguiente medición.

Es entonces donde entra la función `millis()`, la cual nos permite obtener el tiempo transcurrido desde que se inició el programa. Podemos entonces utilizar esta función para determinar si ya ha pasado el tiempo necesario para realizar la siguiente medición.

```cpp
  unsigned long currentMillis = millis();
void loop()
{

  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    // ... codigo de medición de datos
  }
}
```

2. Interrupciones

Las interrupciones son señales que se generan cuando ocurre un evento externo al microcontrolador. Estas señales pueden ser utilizadas para ejecutar un código específico que se encargue de manejar el evento que generó la interrupción. En este caso, podemos utilizar las interrupciones para realizar la medición de datos de los sensores.

```cpp
void setup()
{
  // ... codigo de inicialización de pines
  attachInterrupt(digitalPinToInterrupt(ECHOPIN), echo, CHANGE);
}

void echo()
{
  // ... codigo de medición de datos
}
```
