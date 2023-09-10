import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import dotenv from "dotenv";

dotenv.config();

const allowlist = ["http://localhost:5173", "http://localhost:3001"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  app.enableCors(corsOptionsDelegate);

  await app.listen(process.env.PORT || 3001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
