import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [],
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI'),
  }),
  inject: [ConfigService],
};
