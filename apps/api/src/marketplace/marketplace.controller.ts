import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Persona } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequirePersona } from '../auth/decorators/persona.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { PersonaGuard } from '../auth/guards/persona.guard';
import { SessionGuard } from '../auth/guards/session.guard';
import { MarketplaceService } from './marketplace.service';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneStatusDto } from './dto/update-milestone-status.dto';

@Controller('marketplace')
@UseGuards(SessionGuard)
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('services')
  listServices() {
    return this.marketplaceService.listServices();
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.EMPLOYER)
  @Post('engagements')
  createEngagement(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateEngagementDto) {
    return this.marketplaceService.createEngagement(user.id, dto);
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.EMPLOYER)
  @Post('engagements/:id/milestones')
  addMilestone(@Param('id') id: string, @Body() dto: CreateMilestoneDto) {
    return this.marketplaceService.addMilestone(id, dto);
  }

  @UseGuards(PersonaGuard)
  @RequirePersona(Persona.EMPLOYER)
  @Patch('milestones/:id/status')
  updateMilestoneStatus(@Param('id') id: string, @Body() dto: UpdateMilestoneStatusDto) {
    return this.marketplaceService.updateMilestoneStatus(id, dto);
  }
}
