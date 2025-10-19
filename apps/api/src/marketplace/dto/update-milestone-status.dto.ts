import { IsEnum } from 'class-validator';
import { MilestoneStatus } from '@prisma/client';

export class UpdateMilestoneStatusDto {
  @IsEnum(MilestoneStatus)
  status!: MilestoneStatus;
}
