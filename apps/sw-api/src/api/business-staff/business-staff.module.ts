import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BusinessStaffController } from "./business-staff.controller";
import { BusinessStaffService } from "./business-staff.service";
import { BusinessUser, BusinessUserSchema } from "./entities/business-staff.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BusinessUser.name,
        schema: BusinessUserSchema,
      },
    ]),
  ],
  providers: [BusinessStaffService],
  controllers: [BusinessStaffController],
})
export class BusinessStaffModule {}
