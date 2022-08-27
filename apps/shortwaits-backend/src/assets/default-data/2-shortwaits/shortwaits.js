const { getObjectId } = require("mongo-seeding");
const categories = require("../1-categories/categories");

const defaultCategory = categories.find(
  (category) => category.short_id === "1020"
);

const shortwaitsAdminDefaultData = [
  {
    _id: getObjectId("0000001"),
    short_id: "0000001",
    name: "Shortwaits LLC",
    description: "Shortwaits Default data for the USA area only",
    links: [""],
    suggestedLang: "en",
    blackList: [],
    timeZones: ["ET"],
    categories: [defaultCategory._id],
    serviceColors: {
      red: {
        colorId: 1,
        colorName: "blue",
        hexCode: "#0D50E1",
        isSelected: null,
        isDefault: true,
      },
      blue: {
        colorId: 2,
        colorName: "brown",
        hexCode: "#554623",
        isSelected: null,
        isDefault: false,
      },
      green: {
        colorId: 3,
        colorName: "lightViolet",
        hexCode: "#C59DE7",
        isSelected: null,
        isDefault: false,
      },
      yellow: {
        colorId: 4,
        colorName: "yellow",
        hexCode: "#DBD097",
        isSelected: null,
        isDefault: false,
      },
      lightBlue: {
        colorId: 5,
        colorName: "darkBlue",
        hexCode: "#233255",
        isSelected: null,
        isDefault: false,
      },
      purple: {
        colorId: 6,
        colorName: "lightBlue",
        hexCode: "#97a2db",
        isSelected: null,
        isDefault: false,
      },
    },
    sampleBusinessData: {
      services: [
        {
          name: "Service I - 15 mins",
          applicableCategories: [
            categories[0]._id,
            categories[1]._id,
            categories[2]._id,
          ],
          hours: {
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
          },
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
          serviceColor: {
            colorId: 3,
            colorName: "green",
            hexCode: "#C59DE7",
            isSelected: null,
            isDefault: false,
          },
          imageUrl: "",
        },
        {
          name: "Service II - 1 hr",
          applicableCategories: [
            categories[0]._id,
            categories[1]._id,
            categories[2]._id,
          ],
          hours: {
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
          },
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
          serviceColor: {
            colorId: 2,
            colorName: "blue",
            hexCode: "#554623",
            isSelected: null,
            isDefault: false,
          },
          imageUrl: "",
        },
        {
          name: "Service III - 3 hrs",
          hours: {
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
          },
          applicableCategories: [
            categories[0]._id,
            categories[1]._id,
            categories[2]._id,
          ],
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
          serviceColor: {
            colorId: 1,
            colorName: "red",
            hexCode: "#0D50E1",
            isSelected: null,
            isDefault: true,
          },
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
      hours: {
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
      },
    },
  },
];
module.exports = shortwaitsAdminDefaultData;
