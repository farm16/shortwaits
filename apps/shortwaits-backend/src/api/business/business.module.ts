import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from '../services/services.service';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { Service, ServiceSchema } from '../services/entities/service.entity';
import { BusinessSchema, Business } from './entities/business.entity';
import { UserSchema, User } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
