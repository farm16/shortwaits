import { ShortwaitsStores } from "@shortwaits/shared-lib";
import { businessCategories as categories } from "../business-category/business-category";
import { categoriesIds, defaultBusinessHours, defaultServiceColors, memberships } from "../helpers/helpers";

export const shortwaitsStores: ShortwaitsStores = [
  {
    short_id: "0000001",
    name: "Shortwaits LLC",
    banners: [
      {
        id: "0001",
        short_id: "0001",
        name: "Upgrade to Shortwaits Premium",
      },
    ],
    description: "Shortwaits Default data for the USA area only",
    links: [],
    subscriptionPlans: [
      {
        title: "",
        planColor: "",
        tags: [],
        hasOffer: true,
        offerDescription: "",
        offerCode: "",
        finalPrice: 0,
        price: 0,
        priceDescription: "",
        planDescription: "",
        planId: "",
      },
    ],
    suggestedLang: "en",
    blackList: [],
    timeZones: ["ET"],
    categories: categoriesIds,
    serviceColors: defaultServiceColors,
    membershipPlans: memberships,
    defaultBusinessData: {
      services: [
        {
          name: "Service I - 15 mins",
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          hours: defaultBusinessHours,
          description: "Describe your service here =)",
          durationInMin: 15,
          price: 1500,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "USD",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["red"],
          imageUrl: `https://ui-avatars.com/api/?name=${"S"}${"1"}&background=${defaultServiceColors["red"].hexCode.substring(1)}&color=fff`,
        },
        {
          name: "Service II - 1 hr",
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          hours: defaultBusinessHours,
          description: "Describe your service here =)",
          durationInMin: 60,
          price: 2000,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "USD",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["blue"],
          imageUrl: `https://ui-avatars.com/api/?name=${"S"}${"2"}&background=${defaultServiceColors["blue"].hexCode.substring(1)}&color=fff`,
        },
        {
          name: "Service III - 3 hrs",
          hours: defaultBusinessHours,
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          description: "Describe your service here =)",
          durationInMin: 180,
          price: 2500,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "USD",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["green"],
          imageUrl: `https://ui-avatars.com/api/?name=${"S"}${"3"}&background=${defaultServiceColors["green"].hexCode.substring(1)}&color=fff`,
        },
      ],
      currencies: [
        {
          name: "United States dollar",
          decimalSeparator: 2,
          symbol: "US$",
          code: "USD",
          codeNumber: 840,
        },
        {
          name: "Peruvian sol",
          symbol: "S/",
          decimalSeparator: 2,
          code: "PEN",
          codeNumber: 640,
        },
      ],
      hours: defaultBusinessHours,
      labels: [
        {
          name: "MVP",
          description: "MVP clients only",
          isFavorite: false,
          emojiShortName: "trophy",
        },
        {
          name: "Disability",
          description: "Event will will require wheelchair access",
          isFavorite: false,
          emojiShortName: "wheelchair",
        },
        {
          name: "Family friendly",
          description: "This is a family friendly event",
          isFavorite: false,
          emojiShortName: "man-man-girl-girl",
        },
      ],
      videoConferences: [
        {
          type: "zoom",
          label: "Zoom",
          isActive: false,
          url: "",
        },
        {
          type: "googleMeet",
          label: "Google Meet",
          isActive: false,
          url: "",
        },
        {
          type: "skype",
          label: "Skype",
          isActive: false,
          url: "",
        },
        {
          type: "microsoftTeams",
          label: "Microsoft Teams",
          isActive: false,
          url: "",
        },
        {
          type: "slack",
          label: "Slack",
          isActive: false,
          url: "",
        },
        {
          type: "facebookLive",
          label: "Facebook Live",
          isActive: false,
          url: "",
        },
        {
          type: "instagram",
          label: "Instagram",
          isActive: false,
          url: "",
        },
        {
          type: "youTube",
          label: "Youtube",
          isActive: false,
          url: "",
        },
        {
          type: "twitch",
          label: "Twitch",
          isActive: false,
          url: "",
        },
        {
          type: "discord",
          label: "Discord",
          isActive: false,
          url: "",
        },
        {
          type: "x",
          label: "X",
          isActive: false,
          url: "",
        },
      ],
    },
    accountPermissions: null,
  },
  {
    short_id: "0000002",
    name: "Shortwaits Latam LLC",
    banners: [
      {
        id: "0001",
        short_id: "0001",
        name: "Actualiza a Shortwaits Premium",
      },
    ],
    description: "Shortwaits datos predeterminados para el área de Peru solamente",
    links: [],
    subscriptionPlans: [
      {
        title: "",
        planColor: "",
        tags: [],
        hasOffer: true,
        offerDescription: "",
        offerCode: "",
        finalPrice: 0,
        price: 0,
        priceDescription: "",
        planDescription: "",
        planId: "",
      },
    ],
    suggestedLang: "es",
    blackList: [],
    timeZones: ["UTC"],
    categories: categoriesIds,
    serviceColors: defaultServiceColors,
    membershipPlans: memberships,
    defaultBusinessData: {
      services: [
        {
          name: "Servicio I - 15 mins",
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          hours: defaultBusinessHours,
          description: "Describe tu servicio aquí =)",
          durationInMin: 15,
          price: 1500,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "PEN",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["red"],
          imageUrl: "",
        },
        {
          name: "Servicio II - 1 hr",
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          hours: defaultBusinessHours,
          description: "Describe tu servicio aquí =)",
          durationInMin: 60,
          price: 2000,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "PEN",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["blue"],
          imageUrl: "",
        },
        {
          name: "Servicio III - 3 hrs",
          hours: defaultBusinessHours,
          applicableCategories: [categories[0]._id, categories[1]._id, categories[2]._id],
          description: "Describe tu servicio aquí =)",
          durationInMin: 180,
          price: 2500,
          businessId: null,
          createdBy: null,
          updatedBy: null,
          currency: "PEN",
          isPrivate: false,
          urls: null,
          isVideoConference: false,
          deleted: false,
          serviceColor: defaultServiceColors["green"],
          imageUrl: "",
        },
      ],
      currencies: [
        {
          name: "United States dollar",
          decimalSeparator: 2,
          symbol: "US$",
          code: "USD",
          codeNumber: 840,
        },
        {
          name: "Peruvian sol",
          symbol: "S/",
          decimalSeparator: 2,
          code: "PEN",
          codeNumber: 640,
        },
      ],
      hours: defaultBusinessHours,
      labels: [
        {
          name: "MVP",
          description: "Clientes MVP solamente",
          isFavorite: false,
          emojiShortName: "trophy",
        },
        {
          name: "Discapacidad",
          description: "Evento requerirá acceso para silla de ruedas",
          isFavorite: false,
          emojiShortName: "wheelchair",
        },
        {
          name: "Evento familiar",
          description: "Este es un evento familiar",
          isFavorite: false,
          emojiShortName: "man-man-girl-girl",
        },
      ],
      // some services may be different in latam
      videoConferences: [
        {
          type: "zoom",
          label: "Zoom",
          isActive: false,
          url: "",
        },

        {
          type: "googleMeet",
          label: "Google Meet",
          isActive: false,
          url: "",
        },
        {
          type: "skype",
          label: "Skype",
          isActive: false,
          url: "",
        },
        {
          type: "microsoftTeams",
          label: "Microsoft Teams",
          isActive: false,
          url: "",
        },
        {
          type: "slack",
          label: "Slack",
          isActive: false,
          url: "",
        },
        {
          type: "facebookLive",
          label: "Facebook Live",
          isActive: false,
          url: "",
        },
        {
          type: "instagram",
          label: "Instagram",
          isActive: false,
          url: "",
        },
        {
          type: "youTube",
          label: "Youtube",
          isActive: false,
          url: "",
        },
        {
          type: "twitch",
          label: "Twitch",
          isActive: false,
          url: "",
        },
        {
          type: "discord",
          label: "Discord",
          isActive: false,
          url: "",
        },
        {
          type: "x",
          label: "X",
          isActive: false,
          url: "",
        },
      ],
    },
    accountPermissions: null,
  },
];
