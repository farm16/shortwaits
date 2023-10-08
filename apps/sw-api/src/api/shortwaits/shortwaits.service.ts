import { Injectable } from "@nestjs/common";
import { Shortwaits } from "./shortwaits.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ClientUser } from "../client-user/entities/client-user.entity";
import { Business } from "../business/entities/business.entity";
import { getQuerySelect } from "../../utils/mongoDbUtils";
import { convertStringToObjectId, validateId } from "../../utils/converters";

@Injectable()
export class ShortwaitsService {
  constructor(
    @InjectModel(Shortwaits.name)
    private readonly shortwaitsModel: Model<Shortwaits>,
    @InjectModel(Business.name)
    private businessModel: Model<Business>,
    @InjectModel(ClientUser.name)
    private clientUserModel: Model<ClientUser>
  ) {}

  public async getAdminMobileDefaultData(storeIndicator = "en") {
    const storeIndicators = {
      en: "0000001",
      es: "0000002",
    };
    const shortId = storeIndicators[storeIndicator] || storeIndicators.en;
    console.log("store indicator >>> ", shortId);
    const defaultAdminMobileData = await this.shortwaitsModel.find({
      short_id: shortId,
    });

    // if empty, return 404
    if (!defaultAdminMobileData) {
      throw new Error("No default data found");
    }

    // if array is not empty, return first element
    return defaultAdminMobileData[0];
  }

  public async getBusinessForBooking(shortId: string, clientUserId: string) {
    try {
      let client = null;
      let businesses = null;

      console.log("shortId", shortId);

      if (validateId(clientUserId)) {
        const id = convertStringToObjectId(clientUserId);
        client = await this.clientUserModel.findById(id).exec();
        if (!client) {
          client = null;
        }
      }

      if (shortId) {
        const prohibitedValues = [
          "deleted",
          "clients",
          "isRegistrationCompleted",
          "admins",
          "superAdmins",
          "backgroundAdmins",
          "createdBy",
          "updatedBy",
          "taggedClients",
          "accountType",
        ];
        const query = getQuerySelect(prohibitedValues);
        console.log("query", query);
        businesses = await this.businessModel.find({ shortId }).select(query).exec();
        console.log("businesses", businesses);
      }

      return {
        businesses,
        client,
      };
    } catch (error) {
      // Handle any errors here, e.g., log the error or return an error response
      console.log(error);
      throw new Error("An error occurred while fetching data.");
    }
  }
}
