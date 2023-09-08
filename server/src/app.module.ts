import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { CatsModule } from './cats/cats.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';

@Module({
  imports: [HealthModule, CatsModule, DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
  })],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'cats',
        method: RequestMethod.ALL,
      });
  };
}
