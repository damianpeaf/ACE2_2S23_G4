import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  Logger.log('Server running on 0.0.0.0 and port: ' + (process.env.PORT || 3000), 'Bootstrap');
}
bootstrap();
