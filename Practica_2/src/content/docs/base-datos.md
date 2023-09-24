---
title: Base de Datos
---


### Redis

Durante el proceso de desarrollo se utilizó una API REST por medio de Nest JS, el cual es un framework agil de backend para JS, de esta manera, se realizó la implementación de redis para poder tener el acceso de guardar en cache lo que son los diferentes datos a manipular como los datos que proporcionan los diversos sensores y las notificaciones. Existen diversos motivos del por que Redis, uno de ellos como se mencionó anteriormente la conservación en cache que acelera la entrega de los datos, ademas brinda un rendimiento altamente optimizado, lo cual es util para acelerar todo proceso. Redis tambien ofrece alta compatibilidad con diferentes lenguajes de programación lo que hace considerablemente sencilla su integración con diferentes tecnologias o frameworks, en este caso Nest JS. Por otro lado, la escalabilidad es otro aspecto conveniente, puesto que redis ofrece lo necesario para cubrir el proyecto presentado. La elección de Redis como base de datos es una parte importante del proyecto porque fue clave para lograr un alto rendimiento. ya que la combinación de Redis y Nest JS proporciona la rápida entrega de información en tiempo real, logrando que el usuario que haga uso del dispositivo IoT tenga la mejor experiencia.



### Código de implementación



En primera instancia, para la implementación de redis es necesario configurar los distintos modulos de redis a utilizar a nivel de la aplicación como configModule, RedisModule y socketModule que esta relacionado con la funcionalidad de sockets que permite la transmision en tiempo real del dispositivo IoT, por añadidura, es fundamental y necesario colocar las distintas variables de entorno, las cuales son el host, port y passwoord del redis cloud con el proposito de poder usar Redis como base de datos en la nube logrando que la aplicación pueda almacenar y recuperar datos. 

```ts
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('redisHost'),
          port: configService.get('redisPort'),
          password: configService.get('redisPassword'),
        },
      }),
    }),
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
```


Luego, es necesario crear un servicio donde se importa el servicio de redis que se creo anteriormente en el modulo principal de la API. Este nuevo servicio conlleva una función que se manda a llamar principalmente cada vez que se desea conservar alguna de las distintas notificaciones que conlleva la aplicación del dispositivo IoT, las cuales se especifican en la primera linea de codigo presentado a continuación y son las de Warning que alarma y brinda una advertencia al usuario, Info que provee información necesario al usuario y Error que proporciona retroalimentación sobre algún inconveniente que haya ocurrido durante el uso del dispositivo, de esta manera, se conservan tres tipos de notificaciones en redis en formato de cadena JSON. Por añadidura, se define una interfaz denominada bajo el nombre de NotificationI que tiene la estructura de la notificación con tres propiedades, las cuales son type que es el tipo de notificacion, message que es el mensaje que tiene la notificación y timestamp que posee la fecha y hora en la que se produce.

```ts
export type NotificationType = 'warning' | 'error' | 'info'

export interface NotificationI {
    type: NotificationType,
    message: string,
    timestamp: string,
}


saveNotification(notification: NotificationI) {
    this.redisService.lpush('notifications', JSON.stringify(notification), (err, result) => {
      if (err) {
        this.logger.error(err)
        return
      }
      this.logger.log('Notification saved')
    })
}
```	

Finalmente, para almacenar la información debe existir una función que reciba los topics que contienen la información de cada uno de los sensores que conlleva el dispositivo IoT, de este modo, el interface llamado topicl tiene la responsabilidad de guardar el nombre del topic, los cuales pueden ser temperatura, presencia, cantidad de luz, calidad de aire y humedad con su respectivo valor. Por consiguiente, con la función saveTopic es necesario hacer uso de la operación push que guarda en un array de redis el nuevo argumento recibido por la función en su respectiva llave que corresponde al topic. Otra clave es la añadidura de un gestionador de error por si ocurre algun error durante la operación push, el cual se observa en el codigo mostrado 

```ts	

export interface topicI {
  topic: string
  value: string
}

saveTopic(data: topicI) {
      this.redisService.lpush(data.topic , JSON.stringify(data.value), (err, result) => {
        if (err) {
          this.logger.error(err)
          return
        }
        this.logger.log('Data saved successfully')
      })
}
```
