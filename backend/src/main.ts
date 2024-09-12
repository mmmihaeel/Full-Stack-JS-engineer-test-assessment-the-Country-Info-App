import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: String(configService.get('ALLOWED_ORIGIN')),
    methods: ['GET', 'HEAD'],
    optionsSuccessStatus: 204,
  });

  app.use(compression());

  app.use(helmet());

  const API_PORT = Number(configService.get('PORT') || 3000);

  await app.listen(API_PORT, async () => {
    const url = await app.getUrl();
    logger.log(`Application is running on: ${url}`);
  });
}

bootstrap();
