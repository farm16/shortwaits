import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { BusinessModule } from "./business/business.module";
import { CategoriesModule } from "./categories/categories.module";
import { ShortwaitsModule } from "./shortwaits/shortwaits.module";
import { BusinessUsersModule } from "./business-user/business-users.module";
import { EventsModule } from "./events/events.module";
import { ServicesModule } from "./services/services.module";
import { ClientUserModule } from "./client-user/client-user.module";

@Module({
  imports: [
    AuthModule,
    // BusinessUsersModule,
    BusinessModule,
    ShortwaitsModule,
    EventsModule,
    ServicesModule,
    ClientUserModule,
    CategoriesModule,
  ],
})
export class ApiModule {}
