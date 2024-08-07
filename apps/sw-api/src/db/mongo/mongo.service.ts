import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { print } from "../../utils";

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  createMongooseOptions(): MongooseModuleOptions {
    print({
      module: "MongoConfigService",
      message: "MONGO_DB_DATABASE",
      value: this.config.get<string>("MONGO_DB_DATABASE"),
    });
    print({
      module: "MongoConfigService",
      message: "MONGO_DB_URL",
      value: this.config.get<string>("MONGO_DB_URL"),
    });

    return {
      uri: this.config.get<string>("MONGO_DB_URL"),
      // connectionName: this.config.get<string>('MONGO_DB_DATABASE'),
    };
  }
}
