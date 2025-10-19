import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NonceService } from './nonce.service';
import { SessionService } from './session.service';
import { UsersService } from '../users/users.service';
import { SiweMessage } from 'siwe';
import { Persona, UserRole } from '@prisma/client';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly nonceService: NonceService,
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async generateNonce(address: string) {
    return this.nonceService.generate(address);
  }

  async verifySiwe(message: string, signature: string) {
    const siweMessage = new SiweMessage(message);
    const domain = this.configService.get<string>('SIWE_DOMAIN');
    const { success } = await siweMessage.verify({
      signature,
      domain,
      nonce: siweMessage.nonce,
      time: new Date().toISOString()
    });
    if (!success) {
      throw new UnauthorizedException('Invalid SIWE signature');
    }
    const address = siweMessage.address.toLowerCase();
    const consumed = this.nonceService.consume(siweMessage.nonce, address);
    if (!consumed) {
      throw new UnauthorizedException('Nonce invalid or expired');
    }
    const user = await this.usersService.ensureUser(address);
    const session = await this.establishSession(user.id, user.roles, user.persona);
    return { session, user };
  }

  async mockSignIn(address: string) {
    const allowMock = this.configService.get<string>('ALLOW_MOCK_WALLET');
    if (allowMock !== 'true') {
      throw new BadRequestException('Mock wallet disabled');
    }
    const user = await this.usersService.ensureUser(address.toLowerCase());
    const session = await this.establishSession(user.id, user.roles, user.persona);
    return { session, user };
  }

  async establishSession(userId: string, roles: UserRole[], persona: Persona | null) {
    const { jwt, expiresAt } = await this.sessionService.createSession(userId, roles, persona);
    return { token: jwt, expiresAt };
  }

  async validateSessionToken(token: string): Promise<AuthenticatedUser> {
    try {
      return await this.sessionService.validate(token);
    } catch (error) {
      throw new UnauthorizedException('Session invalid');
    }
  }

  async logout(token: string) {
    if (!token) {
      return;
    }
    try {
      const payload = await this.jwtService.verifyAsync<{ sid: string }>(token);
      await this.sessionService.invalidate(payload.sid);
    } catch (error) {
      return;
    }
  }
}
