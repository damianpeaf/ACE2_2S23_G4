---
title: Uso de sensores
---

### Sensor de iluminación

Para poder tener una medición de la cantidad de luz en el ambiente se optó por la utlización de una fororresistencia LDR. Este componente es de facil uso y se puede encontrar en cualquier tienda de electrónica.

Aprovechando que el arduino cuenta con entradas analógicas, se puede medir la resistencia de la LDR y teniendo un valor de referencia es posible realizar una conversión a Lux.

Para empezar, es necesario definir el pin analógico que se va a utilizar para la lectura de la LDR.

```cpp
// ----------------- LDR -----------------
#define LDRPIN A2
```

Posteriormente, dentro del Setup() se debe inicializar el pin como entrada.

```cpp
pinMode(LDRPIN, INPUT);
```

Finalmente, es posible realizar la medición del pin analógico y obtener un valor de 0 a 1023. Este mismo valor se puede utilizar para realizar una conversión a Lux, como se presenta en el siguiente código.

```cpp
int ldr = analogRead(LDRPIN);
float lumen = 0.6633 * ldr +0.0052;
```

### Presencia humana

Para poder detectar la presencia humana se utilizó un sensor ultrasonico HC-SR04. Este sensor es ideal para detectar la presencia de objetos a una distancia de 2cm a 400cm.

Para empezar, es necesario definir los pines digitales que se van a utilizar para la lectura del HC-SR04.

```cpp
// ----------------- HC-SR04 -----------------
#define TRIGPIN 5
#define ECHOPIN 6
```

Posteriormente, dentro del Setup() se debe inicializar los pines como entrada y salida.

```cpp
pinMode(TRIGPIN, OUTPUT);
pinMode(ECHOPIN, INPUT);
```

Para obtener la distancia a la que se encuentra un objeto, debemos empezar mandando un pulso de 2us al pin TRIGPIN. Posteriormente, se debe esperar a que el pin ECHOPIN cambie a HIGH y se debe medir el tiempo que tarda en cambiar a LOW. Con estos dos valores es posible calcular la distancia a la que se encuentra el objeto. Adicionalmente, se le puede agregar un umbral para determinar si el objeto se encuentra a una distancia menor a 15cm, lo cual se puede interpretar como la presencia de una persona.

```cpp
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
```

### Sensor de temperatura y humedad

Para poder medir la temperatura y humedad del ambiente se utilizó el sensor DHT11. Este sensor es de bajo costo y fácil de utilizar, además de que cuenta con una librería que facilita su uso.

Para empezar, es necesario definir el pin digital que se va a utilizar para la lectura del DHT11, así como la librería que se va a utilizar.


```cpp
#include <DHT.h>

// ----------------- DHT11 -----------------
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
```

Posteriormente, dentro del Setup() se debe inicializar el objeto que se utilizará para la lectura del DHT11.

```cpp
dht.begin();
```

Finalmente, se captura el valor de la medición de la siguiente forma:

```cpp
float temperature = dht.readTemperature();
float humidity = dht.readHumidity();
```

### Sensor de calidad del aire

Para poder medir la calidad del aire se utilizó el sensor MQ135. Empezando por el pin analógico que se va a utilizar para la lectura del MQ135.

```cpp
#define MQ135PIN A1
```

Posteriormente, dentro del Setup() se debe inicializar el pin como entrada.

```cpp
  pinMode(MQ135PIN, INPUT);
```

El valor analogico que proporciona el sensor ya es un valor de concentración de CO2 en el ambiente, por lo que no es necesario realizar ninguna conversión.

```cpp
int airQuality = analogRead(MQ135PIN);
```


### Manejo de Motor DC (ventilador)

Con la ayuda del puente H L298N es posible controlar tanto la dirección de giro como la velocidad de un motor DC. Esto resulta conveniente ya que podemos dotar a nuestro ventilador de un control de velocidad. Empezando por definir los pines digitales que se van a utilizar para el control del motor.

```cpp
const int fanPin = 14;
```

En este caso, para ahorrar las entradas necesarias, y, suponiendo que unicamente se pretendrá variar la velocidad del ventilador, más no la dirección de giro, se utilizará unicamente un pin digital para el control del motor. Posteriormente, dentro del Setup() se debe inicializar el pin como salida.

```cpp
pinMode(fanPin, OUTPUT);
```

Dentro del loop, podemos entonces, con base en variables de estado que se actualizan con la información de los sensores, controlar la velocidad del ventilador.

```cpp
if (ventState == 0)
{
    analogWrite(fanPin, 0); // apagar ventilador
}
else if (ventState == 1)
{
    analogWrite(fanPin, 512); // velocidad media
}
else if (ventState == 2)
{
    analogWrite(fanPin, 1023); // velocidad alta
}
```


### Control de la puerta (servomotor)

Para poder controlar la puerta se utilizó un servomotor SG90. Este servomotor es de bajo costo y fácil de utilizar, además de que cuenta con una librería que facilita su uso.

Para empezar, es necesario definir el pin digital que se va a utilizar para el control del servomotor, así como la librería que se va a utilizar.

```cpp
#include <Servo.h>
const int doorPin = 15;
Servo door;
```

De igual forma, que para el control del ventilador, se utilizará unicamente un pin digital para el control del servomotor. Posteriormente, dentro del Setup() se debe inicializar el objeto que se utilizará para el control del servomotor.

```cpp
door.attach(doorPin);
```

Dentro del loop, podemos entonces, con base en variables de estado que se actualizan con la información de los sensores, controlar la posición del servomotor.

```cpp
if (doorState == 0)
{
    door.write(0); // cerrar puerta
}
else if (doorState == 1)
{
    door.write(90); // abrir puerta
}
```


### Comunicación serial

Para realizar toda la transferencia de información de sensores, se comunicará con una aplicación de nodeJs por medio del puerto serial. De esta manera la aplicación podrá recibir datos y mandarlos utilizando el protocolo MQTT.