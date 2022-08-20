import * as path from "path";
import * as dotenv from "dotenv";
import { Seeder } from "mongo-seeding";

dotenv.config({ path: "./src/assets/development.env" });

const config = {
  database: process.env.MONGO_DB_URL,
  dropDatabase: true,
  dropCollections: true,
};
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve("./src/scripts/default-data"),
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
  .catch((error) => {
    console.log("***********************************************");
    console.log("****************** ERROR !!! ******************");
    console.log("***********************************************");
    logSpace();
    console.log(error);
    logSpace();
    console.log("***********************************************");
    logSpace();
  });
