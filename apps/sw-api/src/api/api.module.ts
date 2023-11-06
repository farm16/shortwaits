import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { BusinessStaffModule } from "./business-staff/business-staff.module";
import { BusinessModule } from "./business/business.module";
import { CategoriesModule } from "./categories/categories.module";
import { ClientUserModule } from "./client-user/client-user.module";
import { EventsModule } from "./events/events.module";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { LocalClientUserModule } from "./local-client-user/local-client-user.module";
import { ServicesModule } from "./services/services.module";
import { ShortwaitsModule } from "./shortwaits/shortwaits.module";

@Module({
  imports: [
    AuthModule,
    BusinessModule,
    ShortwaitsModule,
    EventsModule,
    ServicesModule,
    CategoriesModule,
    ClientUserModule,
    LocalClientUserModule,
    BusinessStaffModule,
    FileUploadModule,
  ],
})
export class ApiModule {}
