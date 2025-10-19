import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { TalentController } from './talent.controller';
import { TalentService } from './talent.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TalentController],
  providers: [TalentService]
})
export class TalentModule {}
