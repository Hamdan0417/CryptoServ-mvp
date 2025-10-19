import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEngagementDto } from './dto/create-engagement.dto';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneStatusDto } from './dto/update-milestone-status.dto';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async listServices() {
    const services = await this.prisma.serviceOffering.findMany({ orderBy: { createdAt: 'desc' } });
    return services.map((service) => ({
      id: service.id,
      title: service.title,
      summary: service.summary,
      tier: service.tier,
      price: service.price.toString()
    }));
  }

  async createEngagement(userId: string, dto: CreateEngagementDto) {
    const service = await this.prisma.serviceOffering.findUnique({ where: { id: dto.serviceId } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return this.prisma.engagement.create({
      data: {
        requesterId: userId,
        providerId: dto.providerId ?? null,
        serviceId: dto.serviceId
      },
      include: { service: true, milestones: true }
    });
  }

  async addMilestone(engagementId: string, dto: CreateMilestoneDto) {
    const engagement = await this.prisma.engagement.findUnique({ where: { id: engagementId } });
    if (!engagement) {
      throw new NotFoundException('Engagement not found');
    }
    return this.prisma.milestone.create({
      data: {
        engagementId,
        title: dto.title,
        description: dto.description ?? null,
        amount: new Prisma.Decimal(dto.amount),
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null
      }
    });
  }

  async updateMilestoneStatus(id: string, dto: UpdateMilestoneStatusDto) {
    const milestone = await this.prisma.milestone.findUnique({ where: { id } });
    if (!milestone) {
      throw new NotFoundException('Milestone not found');
    }
    return this.prisma.milestone.update({
      where: { id },
      data: { status: dto.status }
    });
  }
}
