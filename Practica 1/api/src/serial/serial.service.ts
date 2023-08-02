import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common/services';

import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

@Injectable()
export class SerialService {
  private port: SerialPort;
  private parser: ReadlineParser;

  constructor(private readonly config: ConfigService) {
    this.port = new SerialPort({
      path: config.get<string>('serialPort'),
      baudRate: config.get<number>('serialBaudRate'),
    });
  }

  onModuleInit() {
    this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    this.parser.on('data', (data) => {
      // TODO: call the redis service to store the data
      Logger.log(
        {
          message: `Received data from serial port: ${data}`,
          data,
        },
        'SerialService',
      );
    });

    Logger.log(
      `Listening to serial port ${this.config.get<string>(
        'serialPort',
      )} at ${this.config.get<number>('serialBaudRate')} bauds`,
      'SerialService',
    );
  }
}
