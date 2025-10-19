import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/app.config';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TalentModule } from './talent/talent.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    PrismaModule,
    AuthModule,
    TalentModule,
    MarketplaceModule,
    TokenModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
