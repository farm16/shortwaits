import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { BusinessStaffModule } from "./business-staff/business-staff.module";
import { BusinessModule } from "./business/business.module";
import { CategoriesModule } from "./categories/categories.module";
import { ClientsModule } from "./clients/clients.module";
import { EventTransactionsModule } from "./event-transactions/event-transactions.module";
import { BusinessEventsModule, ClientEventsModule } from "./events";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { LocalClientsModule } from "./local-clients/local-clients.module";
import { ServicesModule } from "./services/services.module";
import { ShortwaitsModule } from "./shortwaits/shortwaits.module";

@Module({
  imports: [
    AuthModule,
    BusinessModule,
    ShortwaitsModule,
    BusinessEventsModule,
    ClientEventsModule,
    ServicesModule,
    CategoriesModule,
    ClientsModule,
    LocalClientsModule,
    BusinessStaffModule,
    FileUploadModule,
    EventTransactionsModule,
  ],
})
export class ApiModule {}
