import { SetMetadata } from '@nestjs/common';
import { Persona } from '@prisma/client';

export const PERSONA_KEY = 'persona';
export const RequirePersona = (persona: Persona) => SetMetadata(PERSONA_KEY, persona);
