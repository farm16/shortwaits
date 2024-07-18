import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema } from "../business/entities/business.entity";
import { BusinessUserController } from "./business-users.controller";
import { BusinessUserService } from "./business-users.service";
import { BusinessUser, BusinessUserSchema } from "./entities/business-user.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessUser.name,
        schema: BusinessUserSchema,
      },
      {
        name: Business.name,
        schema: BusinessSchema,
      },
    ]),
  ],
  providers: [BusinessUserService],
  controllers: [BusinessUserController],
})
export class BusinessUserModule {}
