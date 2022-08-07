import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModule } from './api/api.module';

import { getEnvPath } from './common/env.helper';
import { MongooseConfigService } from './shared/mongoose/mongoose.service';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

const envFilePath: string = getEnvPath(`${__dirname}/assets`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ApiModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
