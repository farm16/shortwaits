import { Injectable } from '@nestjs/common';
import { Shortwaits } from './shortwaits.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ShortwaitsAdminDefaultDataPayloadType } from '@shortwaits/shared-types';

const DEFAULT = {
  short_id: '0000001',
};

@Injectable()
export class ShortwaitsService {
  @InjectModel(Shortwaits.name)
  private readonly shortwaitsModel: Model<Shortwaits>;

  public async getMobileDefaultData(): Promise<
    ShortwaitsAdminDefaultDataPayloadType[]
  > {
    const defaultMobileData = await this.shortwaitsModel.find(DEFAULT);
    return defaultMobileData;
  }
}
