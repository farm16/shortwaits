import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { SequelizeModule } from "@nestjs/sequelize";
import { ApiModule } from "./api/api.module";
import { getEnvPath } from "./common/env.helper";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { MongoConfigService } from "./db/mongo/mongo.service";
import { SqliteConfigService } from "./db/sqlite/sqlite.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./utils/email/email.service";

const envFilePath = getEnvPath();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MailerModule.forRootAsync(EmailService),
    SequelizeModule.forRootAsync(SqliteConfigService),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const ASSETS_PATH = `${__dirname}/assets/`;
    const filename = NODE_ENV === "production" ? `.env` : ".env.development";

    console.log();
    console.log("====================================================================");
    console.log("===================Environment variables============================");
    console.log("====================================================================");
    console.log();
    console.log(`>>>>>> NODE_ENV: ${NODE_ENV}`);
    console.log();
    console.log(`>>>>>> Accessing assets from: ${ASSETS_PATH}`);
    console.log();
    console.log(`>>>>>> ENV file: ${filename}`);
    console.log();
    console.log("====================================================================");
    console.log();
  }
}
