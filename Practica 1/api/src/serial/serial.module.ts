import { Module } from '@nestjs/common';
import { SerialService } from './serial.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SerialService],
  exports: [SerialService],
})
export class SerialModule {}
