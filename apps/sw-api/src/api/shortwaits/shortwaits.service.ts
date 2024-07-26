import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { convertStringIdToObjectId, validateId } from "../../utils/common";
import { getQuerySelect } from "../../utils/mongoDbUtils";
import { Business } from "../business/entities/business.entity";
import { Client } from "../clients/entities/client.entity";
import { Shortwaits } from "./entities/shortwaits.entity";

@Injectable()
export class ShortwaitsService {
  constructor(
    @InjectModel(Shortwaits.name)
    private readonly shortwaitsModel: Model<Shortwaits>,
    @InjectModel(Business.name)
    private businessModel: Model<Business>,
    @InjectModel(Client.name)
    private clientUserModel: Model<Client>
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
        const id = convertStringIdToObjectId(clientUserId);
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

  getPrivacyPolicyData(locale: string) {
    const lastUpdated = new Date().toISOString().split("T")[0];
    return {
      lastUpdated: lastUpdated,
      overview:
        'Shortwaits App ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our mobile application.',
      informationCollection: {
        personalInformation: ["Name", "Email address", "Phone number", "[Any additional information relevant to the app]"],
        nonPersonalInformation:
          "We may also collect non-personal information such as device information, usage data, and analytics to improve our services and enhance user experience.",
      },
      howWeUseInformation:
        "We may use the information we collect for purposes such as providing and maintaining Shortwaits App, improving user experience, responding to inquiries, and sending important notifications and updates.",
      dataSecurity: "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.",
      thirdPartyServices:
        "Shortwaits App may contain links to third-party services. Please be aware that we are not responsible for the content or privacy practices of these third-party services.",
      changesToPolicy: "We may update our Privacy Policy from time to time. You are advised to review this Privacy Policy periodically for any changes.",
      contactUs: "If you have any questions or concerns about our Privacy Policy, please contact us at [Your Contact Information].",
      consent: "By using Shortwaits App, you consent to the terms of this Privacy Policy.",
    };
  }

  createMultipleShortwaitsStores(shortwaits: Shortwaits[]) {
    return this.shortwaitsModel.create(shortwaits);
  }
}
