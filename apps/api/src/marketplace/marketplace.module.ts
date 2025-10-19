import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService]
})
export class MarketplaceModule {}
