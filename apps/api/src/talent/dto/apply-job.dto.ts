import { IsOptional, IsString } from 'class-validator';

export class ApplyJobDto {
  @IsString()
  jobId!: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
