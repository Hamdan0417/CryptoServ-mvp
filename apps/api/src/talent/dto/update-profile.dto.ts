import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  displayName!: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];
}
