import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BusinessUserService } from "./business-users.service";
import { BusinessUsersController } from "./business-users.controller";
import { BusinessUserSchema, BusinessUser } from "./entities/business-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessUser.name,
        schema: BusinessUserSchema,
      },
    ]),
  ],
  providers: [BusinessUserService],
  controllers: [BusinessUsersController],
})
export class BusinessUsersModule {}
