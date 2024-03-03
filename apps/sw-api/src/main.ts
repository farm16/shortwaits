import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import helmet from "helmet";
import { join } from "path";
import { SwaggerTheme } from "swagger-themes";
import { SwaggerThemeNameEnum } from "swagger-themes/build/enums/swagger-theme-name";
import { AppModule } from "./app.module";

const API_PREFIX = "v1";
const DOCS_PREFIX = `${API_PREFIX}/docs`;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(API_PREFIX);
  app.use(helmet());
  app.setViewEngine({
    engine: {
      handlebars: require("handlebars"),
    },
    templates: join(__dirname, ".", "views"),
  });

  if (configService.get("NODE_ENV") === "production") {
    console.log(">>> Enabling CORS for production");
    app.enableCors();
  }

  const HTTP_PORT = configService.get("HTTP_PORT");
  const HTTP_HOST = configService.get("HTTP_HOST");

  //swagger setup
  const swaggerDocumentConfig = new DocumentBuilder()
    .setTitle("Shortwaits Admin - API")
    .setDescription(html)
    .addServer("http://127.0.0.1:8080", "Dev server")
    .addServer("https://api.shortwaits.com", "Production server")
    .addBearerAuth()
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocumentConfig);
  const theme = new SwaggerTheme();
  const swaggerConfig = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  };
  SwaggerModule.setup(DOCS_PREFIX, app, document, swaggerConfig);

  fs.writeFile("swagger.json", JSON.stringify(document), err => {
    if (err) throw err;
    console.log("[DOCS] Swagger (OpenAPI) document saved to swagger.json");
  });

  await app.listen(HTTP_PORT, HTTP_HOST);

  const appUrl = await app.getUrl();
  console.log("[HTTP]", appUrl);
  console.log("[DOCS]", `${appUrl}/${DOCS_PREFIX}`);
}

bootstrap();

const html = `Shortwaits's successful response: <br>
<code>{data: [
{ id: 1, name: "Item 1" },
{ id: 2, name: "Item 2" },
{ id: 3, name: "Item 3" },
],<br>
statusCode: 200,<br>
meta: {
pagination: {
totalItems: 10,
totalPages: 2,
currentPage: 1,
itemsPerPage: 3,
},
},
}<code>
`;
