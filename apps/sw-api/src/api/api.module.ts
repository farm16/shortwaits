import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { BusinessModule } from "./business/business.module";
import { CategoriesModule } from "./categories/categories.module";
import { ShortwaitsModule } from "./shortwaits/shortwaits.module";
import { BusinessUsersModule } from "./business-user/business-users.module";
import { EventsModule } from "./events/events.module";
import { ServicesModule } from "./services/services.module";
import { ClientUserModule } from "./client-user/client-user.module";
import { FileUploadModule } from "./file-upload/file-upload.module";

@Module({
  imports: [
    AuthModule,
    BusinessModule,
    ShortwaitsModule,
    EventsModule,
    ServicesModule,
    CategoriesModule,
    ClientUserModule,
    BusinessUsersModule,
    FileUploadModule,
  ],
})
export class ApiModule {}
