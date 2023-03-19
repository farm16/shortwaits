import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import helmet from "helmet";
import * as fs from "fs";

const API_PREFIX = "v1";
const DOCS_PREFIX = API_PREFIX + "/docs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.use(helmet());

  const HTTP_PORT = configService.get("HTTP_PORT");
  const HTTP_HOST = configService.get("HTTP_HOST");

  //swagger setup
  const options = new DocumentBuilder()
    .setTitle("Shortwaits Admin - API")
    .setDescription("Shortwaits's API")
    .addServer("https://api.shortwaits.com", "Production server")
    .addServer("http://127.0.0.1:8080", "Dev server")
    .addBearerAuth()
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(DOCS_PREFIX, app, document);
  fs.writeFile("swagger.json", JSON.stringify(document), (err) => {
    if (err) throw err;
    console.log("[DOCS] Swagger (OpenAPI) document saved to swagger.json");
  });

  await app.listen(HTTP_PORT, HTTP_HOST);

  const appUrl = await app.getUrl();
  console.log("[HTTP]", appUrl);
  console.log("[DOCS]", `${appUrl}/${DOCS_PREFIX}`);
}
bootstrap();
