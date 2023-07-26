import { Injectable } from "@nestjs/common";
import { Shortwaits } from "./shortwaits.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ShortwaitsAdminDefaultDataPayloadType } from "@shortwaits/shared-lib";

const DEFAULT = {
  short_id: "0000001",
};

@Injectable()
export class ShortwaitsService {
  @InjectModel(Shortwaits.name)
  private readonly shortwaitsModel: Model<Shortwaits>;

  public async getMobileDefaultData(): Promise<ShortwaitsAdminDefaultDataPayloadType> {
    const defaultAdminMobileDataArr = await this.shortwaitsModel.find(DEFAULT);
    /**will be distributed based on location (can be filtered by other means ???)*/
    const defaultAdminMobileData = defaultAdminMobileDataArr.find(
      elem => elem.short_id === "0000001"
    );
    return defaultAdminMobileData;
  }
}
