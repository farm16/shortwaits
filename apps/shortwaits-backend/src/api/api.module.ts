import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { CategoriesModule } from './categories/categories.module';
import { ShortwaitsModule } from './shortwaits/shortwaits.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ShortwaitsModule,
    BusinessModule,
    CategoriesModule,
    EventsModule,
    ServicesModule,
  ],
})
export class ApiModule {}
