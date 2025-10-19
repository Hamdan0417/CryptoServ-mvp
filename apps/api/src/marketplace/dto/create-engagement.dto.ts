import { IsOptional, IsString } from 'class-validator';

export class CreateEngagementDto {
  @IsString()
  serviceId!: string;

  @IsOptional()
  @IsString()
  providerId?: string;
}
