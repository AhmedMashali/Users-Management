import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getCorsConfig } from './config/cors.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const corsConfig = getCorsConfig(configService);
  app.enableCors(corsConfig);
  app.use(helmet());

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
