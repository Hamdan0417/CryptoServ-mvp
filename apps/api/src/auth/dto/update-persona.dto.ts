import { IsEnum } from 'class-validator';
import { Persona } from '@prisma/client';

export class UpdatePersonaDto {
  @IsEnum(Persona)
  persona!: Persona;
}
