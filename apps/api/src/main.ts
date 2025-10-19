import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT', 4000);

  await app.listen(port);
  const url = await app.getUrl();
  Logger.log(`API listening on ${url}`, 'Bootstrap');
}

bootstrap();
