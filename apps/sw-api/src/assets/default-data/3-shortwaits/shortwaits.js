const { getObjectId } = require("mongo-seeding");
const categories = require("../1-business_category/business_category");
const membership = require("../2-business_membership/business_membership");
const categoriesIds = categories.map(category => category._id);
const membershipPlans = membership.map(membership => membership._id);

const defaultServiceColors = {
  red: {
    colorId: "1",
    colorName: "red",
    hexCode: "#e07a5f",
    isSelected: null,
    isDefault: true,
  },
  blue: {
    colorId: "2",
    colorName: "blue",
    hexCode: "#0c41ff",
    isSelected: null,
    isDefault: false,
  },
  green: {
    colorId: "3",
    colorName: "green",
    hexCode: "#7ac590",
    isSelected: null,
    isDefault: false,
  },
  yellow: {
    colorId: "4",
    colorName: "yellow",
    hexCode: "#f2cc8f",
    isSelected: null,
    isDefault: false,
  },
  lightBlue: {
    colorId: "5",
    colorName: "lightBlue",
    hexCode: "#4ceaff",
    isSelected: null,
    isDefault: false,
  },
  purple: {
    colorId: "6",
    colorName: "purple",
    hexCode: "#766fff",
    isSelected: null,
    isDefault: false,
  },
};

const defaultBusinessHours = {
  mon: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  tue: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  wed: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  thu: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  fri: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sat: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sun: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
};

const shortwaitsAdminDefaultData = [
  {
    _id: getObjectId("0000001"),
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
    suggestedLang: "en",
    blackList: [],
    timeZones: ["ET"],
    categories: categoriesIds,
    serviceColors: defaultServiceColors,
    membershipPlans: membershipPlans,
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
        { label: "Zoom", isActive: false, url: "" },
        { label: "Meets", isActive: false, url: "" },
        { label: "Teams", isActive: false, url: "" },
        { label: "Slack", isActive: false, url: "" },
        { label: "Facebook Live", isActive: false, url: "" },
        { label: "Instagram", isActive: false, url: "" },
        { label: "Youtube", isActive: false, url: "" },
        { label: "Twitch", isActive: false, url: "" },
        { label: "Twitter", isActive: false, url: "" },
      ],
    },
  },
  {
    _id: getObjectId("0000002"),
    short_id: "0000002",
    name: "Shortwaits Latam LLC",
    banners: [
      {
        id: "0001",
        short_id: "0001",
        // spanish language
        name: "Actualiza a Shortwaits Premium",
      },
    ],
    //spanish
    description: "Shortwaits datos predeterminados para el área de Peru solamente",
    links: [],
    suggestedLang: "es",
    blackList: [],
    // universal time
    timeZone: ["UTC"],
    categories: categoriesIds,
    serviceColors: defaultServiceColors,
    membershipPlans: membershipPlans,
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
        { label: "Zoom", isActive: false, url: "" },
        { label: "Meets", isActive: false, url: "" },
        { label: "Teams", isActive: false, url: "" },
        { label: "Slack", isActive: false, url: "" },
        { label: "Facebook Live", isActive: false, url: "" },
        { label: "Instagram", isActive: false, url: "" },
        { label: "Youtube", isActive: false, url: "" },
        { label: "Twitch", isActive: false, url: "" },
        { label: "Twitter", isActive: false, url: "" },
      ],
    },
  },
];

module.exports = shortwaitsAdminDefaultData;
