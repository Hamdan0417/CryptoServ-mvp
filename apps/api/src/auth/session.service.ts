import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import dayjs from 'dayjs';
import { randomBytes } from 'crypto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { Persona, UserRole } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async createSession(userId: string, roles: UserRole[], persona: Persona | null) {
    const token = randomBytes(32).toString('hex');
    const ttlHours = Number(this.configService.get('SESSION_TTL_HOURS', 24));
    const expiresAt = dayjs().add(ttlHours, 'hour').toDate();
    await this.prisma.session.create({ data: { token, userId, expiresAt } });
    const jwt = await this.jwtService.signAsync({ sid: token, sub: userId, roles, persona });
    return { jwt, expiresAt };
  }

  async validate(token: string): Promise<AuthenticatedUser> {
    try {
      const payload = await this.jwtService.verifyAsync<{ sid: string; sub: string }>(token);
      const session = await this.prisma.session.findUnique({
        where: { token: payload.sid },
        include: { user: true }
      });
      if (!session || dayjs(session.expiresAt).isBefore(dayjs())) {
        throw new Error('Session expired');
      }
      return {
        id: session.user.id,
        walletAddress: session.user.walletAddress,
        roles: session.user.roles,
        persona: session.user.persona
      };
    } catch (error) {
      throw error;
    }
  }

  async invalidate(token: string) {
    await this.prisma.session.deleteMany({ where: { token } });
  }
}
