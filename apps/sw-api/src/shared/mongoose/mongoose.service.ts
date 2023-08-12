import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  createMongooseOptions(): MongooseModuleOptions {
    console.log("MONGO_DB_DATABASE >>>", this.config.get<string>("MONGO_DB_DATABASE"));
    return {
      uri: this.config.get<string>("MONGO_DB_URL"),
      // connectionName: this.config.get<string>('MONGO_DB_DATABASE'),
    };
  }
}
