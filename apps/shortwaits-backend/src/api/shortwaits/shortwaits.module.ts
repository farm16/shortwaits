import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortwaitsController } from './shortwaits.controller';
import { Shortwaits, ShortwaitsSchema } from './shortwaits.schema';
import { ShortwaitsService } from './shortwaits.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shortwaits.name, schema: ShortwaitsSchema },
    ]),
  ],
  controllers: [ShortwaitsController],
  providers: [ShortwaitsService],
})
export class ShortwaitsModule {}
