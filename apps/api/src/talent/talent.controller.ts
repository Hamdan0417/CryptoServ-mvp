import { Body, Controller, Get, Put, Post, UseGuards } from '@nestjs/common';
import { Persona } from '@prisma/client';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SessionGuard } from '../auth/guards/session.guard';
import { PersonaGuard } from '../auth/guards/persona.guard';
import { RequirePersona } from '../auth/decorators/persona.decorator';
import { TalentService } from './talent.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@Controller('talent')
@UseGuards(SessionGuard)
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.TALENT)
  @Get('profile')
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    const profile = await this.talentService.getProfile(user.id);
    if (!profile) {
      return null;
    }
    return profile;
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.TALENT)
  @Put('profile')
  async updateProfile(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateProfileDto) {
    const profile = await this.talentService.upsertProfile(user.id, dto);
    return profile;
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.TALENT)
  @Get('jobs')
  listJobs() {
    return this.talentService.listJobs();
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.TALENT)
  @Post('applications')
  apply(@CurrentUser() user: AuthenticatedUser, @Body() dto: ApplyJobDto) {
    return this.talentService.applyToJob(user.id, dto);
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.TALENT)
  @Get('applications')
  listApplications(@CurrentUser() user: AuthenticatedUser) {
    return this.talentService.listApplications(user.id);
  }
}
