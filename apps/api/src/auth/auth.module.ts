import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NonceService } from './nonce.service';
import { SessionService } from './session.service';
import { SessionGuard } from './guards/session.guard';
import { RolesGuard } from './guards/roles.guard';
import { PersonaGuard } from './guards/persona.guard';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: `${config.get('SESSION_TTL_HOURS', 24)}h` }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, NonceService, SessionService, SessionGuard, RolesGuard, PersonaGuard],
  exports: [AuthService, SessionGuard, RolesGuard, PersonaGuard]
})
export class AuthModule {}
