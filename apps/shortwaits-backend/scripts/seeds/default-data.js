const path = require("path");
const dotenv = require("dotenv");
const { Seeder } = require("mongo-seeding");

dotenv.config({ path: "apps/shortwaits-backend/src/assets/development.env" });

console.log("TARGETING => " + process.env.MONGO_DB_URL);

const config = {
  database: process.env.MONGO_DB_URL,
  dropDatabase: true,
  dropCollections: true,
};
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve("./apps/shortwaits-backend/src/assets/default-data"),
  {
    extensions: ["js", "json", "ts"],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  }
);
const logSpace = () => console.log("\n\n");
seeder
  .import(collections)
  .then(() => {
    logSpace();
    console.log("************************************************");
    console.log("************ Database seeded !!! ***************");
    console.log("************************************************");
  })
  .catch(error => {
    console.log("***********************************************");
    console.log("****************** ERROR !!! ******************");
    console.log("***********************************************");
    logSpace();
    console.log(error);
    logSpace();
    console.log("***********************************************");
    logSpace();
  });
