import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import { EventTransactionModel } from "../../api/event-transactions/models/event-transaction.model";

export const SqliteConfigService: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const database = configService.get<string>("SQLITE_DB_DATABASE");
    const databasePath = configService.get<string>("SQLITE_DB_PATH");
    const autoLoadModels = configService.get<string>("SQLITE_DB_AUTO_LOAD_MODELS") === "1";
    const synchronize = configService.get<string>("SQLITE_DB_SYNCHRONIZE") === "1";
    const forceSync = configService.get<string>("SQLITE_DB_FORCE_SYNC") === "1";
    const logQueryParameters = configService.get<string>("SQLITE_DB_LOG_QUERY_PARAMETERS") === "1";
    const logging = configService.get<string>("SQLITE_DB_LOGGING") === "1";

    const currentPath = process.cwd() + "/" + databasePath;

    console.log("SQLITE_DB_DATABASE >>>", database);
    console.log("SQLITE_DB_PATH >>>", databasePath);
    console.log("process.cwd() + databasePath >>>", currentPath);
    console.log("SQLITE_DB_AUTO_LOAD_MODELS >>>", autoLoadModels);
    console.log("SQLITE_DB_SYNCHRONIZE >>>", synchronize);
    console.log("SQLITE_DB_FORCE_SYNC >>>", forceSync);
    console.log("SQLITE_DB_LOG_QUERY_PARAMETERS >>>", logQueryParameters);
    console.log("SQLITE_DB_LOGGING >>>", logging);

    return {
      dialect: "sqlite",
      storage: currentPath,
      logging: sql => {
        if (logging) {
          console.log("SQL >>>", sql);
        }
      },
      logQueryParameters: logQueryParameters,
      models: [EventTransactionModel],
      sync: { force: forceSync },
      autoLoadModels: autoLoadModels,
      synchronize: synchronize,
    };
  },
};
