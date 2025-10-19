import { BadRequestException, Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { VerifySiweDto } from './dto/verify-siwe.dto';
import { MockSignInDto } from './dto/mock-signin.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { SessionGuard } from './guards/session.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  @Get('nonce')
  async getNonce(@Query('address') address: string) {
    if (!address) {
      throw new BadRequestException('address is required');
    }
    const nonce = await this.authService.generateNonce(address);
    return { nonce };
  }

  @Post('siwe')
  async verifySiwe(@Body() dto: VerifySiweDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.verifySiwe(dto.message, dto.signature);
    this.attachSessionCookie(res, result.session.token, result.session.expiresAt);
    return this.toSessionResponse(result.user);
  }

  @Post('mock')
  async mock(@Body() dto: MockSignInDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.mockSignIn(dto.address);
    this.attachSessionCookie(res, result.session.token, result.session.expiresAt);
    return this.toSessionResponse(result.user);
  }

  @UseGuards(SessionGuard)
  @Get('session')
  getSession(@CurrentUser() user: AuthenticatedUser | undefined) {
    if (!user) {
      return null;
    }
    return user;
  }

  @UseGuards(SessionGuard)
  @Post('persona')
  async updatePersona(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdatePersonaDto) {
    const updated = await this.usersService.updatePersona(user.id, dto.persona);
    return this.toSessionResponse(updated);
  }

  @UseGuards(SessionGuard)
  @Post('logout')
  async logout(@CurrentUser() user: AuthenticatedUser, @Res({ passthrough: true }) res: Response) {
    const request = res.req as Response['req'] & { cookies?: Record<string, string> };
    const token = request.cookies?.['cs_session'];
    await this.authService.logout(token ?? '');
    res.clearCookie('cs_session');
    return { success: true };
  }

  private attachSessionCookie(res: Response, token: string, expiresAt: Date) {
    const isSecure = this.configService.get<string>('NODE_ENV') === 'production';
    res.cookie('cs_session', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      expires: new Date(expiresAt)
    });
  }

  private toSessionResponse(user: { id: string; walletAddress: string; roles: string[]; persona: string | null }) {
    return {
      id: user.id,
      walletAddress: user.walletAddress,
      roles: user.roles,
      persona: user.persona
    };
  }
}
