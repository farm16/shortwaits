import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./business-categories/business-categories.module";
import { BusinessReviewsModule } from "./business-reviews/business-reviews.module";
import { ServicesModule } from "./business-services/business-services.module";
import { BusinessUsersModule } from "./business-users/business-users.module";
import { BusinessModule } from "./business/business.module";
import { ClientsModule } from "./clients/clients.module";
import { EventTransactionsModule } from "./event-transactions/event-transactions.module";
import { BusinessEventsModule, ClientEventsModule } from "./events";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { LocalClientsModule } from "./local-clients/local-clients.module";
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
    BusinessUsersModule,
    FileUploadModule,
    EventTransactionsModule,
    BusinessReviewsModule,
  ],
})
export class ApiModule {}
