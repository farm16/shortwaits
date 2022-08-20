import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("HTTP_PORT");

  app.setGlobalPrefix("/api/v1");

  const options = new DocumentBuilder()
    .setTitle("Shortwaits Admin - API")
    .setDescription("Shortwaits's API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document);

  app.enableCors();
  app.use(helmet());

  await app.listen(port, () => {
    console.log("[HTTP]", `http://localhost:${port}`);
    console.log("[DOCS]", `http://localhost:${port}/api/docs`);
  });
}
bootstrap();
