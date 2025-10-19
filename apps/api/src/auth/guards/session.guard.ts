import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.['cs_session'];
    if (!token) {
      throw new UnauthorizedException('Session token missing');
    }
    const user = await this.authService.validateSessionToken(token);
    request.user = user;
    return true;
  }
}
