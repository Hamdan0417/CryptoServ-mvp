import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
