import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Persona } from '@prisma/client';
import { PERSONA_KEY } from '../decorators/persona.decorator';

@Injectable()
export class PersonaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPersona = this.reflector.getAllAndOverride<Persona>(PERSONA_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredPersona) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.persona) {
      throw new ForbiddenException('Persona not assigned');
    }
    if (user.persona !== requiredPersona) {
      throw new ForbiddenException('Persona not allowed');
    }
    return true;
  }
}
