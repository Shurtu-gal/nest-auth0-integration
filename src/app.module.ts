import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { CatsModule } from './cats/cats.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [HealthModule, CatsModule, DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
  })],
})
export class AppModule {}
