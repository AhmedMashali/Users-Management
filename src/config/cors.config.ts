import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService): CorsOptions => ({
  origin: configService.get<string>('CORS_ORIGIN') || '*',
  credentials: true,
});
