import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false
    })
  );

  const config = app.get(ConfigService);
  app.enableCors({
    origin: config.get<string>('app.siwe.origin') ?? 'http://localhost:3000',
    credentials: true
  });

  const port = config.get<number>('API_PORT', 4000);

  await app.listen(port);
  const url = await app.getUrl();
  Logger.log(`API listening on ${url}`, 'Bootstrap');
}

bootstrap();
