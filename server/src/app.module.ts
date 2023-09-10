import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { CatsModule } from "./cats/cats.module";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { LoggerMiddleware } from "./utils/middleware/logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    HealthModule,
    CatsModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== "production",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "cats",
      method: RequestMethod.ALL,
    });
  }
}
