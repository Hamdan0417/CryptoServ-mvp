import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@Injectable()
export class TalentService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }

  async upsertProfile(userId: string, dto: UpdateProfileDto) {
    const existing = await this.getProfile(userId);
    if (existing) {
      return this.prisma.profile.update({
        where: { id: existing.id },
        data: {
          displayName: dto.displayName,
          headline: dto.headline,
          bio: dto.bio,
          skills: dto.skills
        }
      });
    }
    return this.prisma.profile.create({
      data: {
        userId,
        displayName: dto.displayName,
        headline: dto.headline,
        bio: dto.bio,
        skills: dto.skills
      }
    });
  }

  async listJobs() {
    const jobs = await this.prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: { company: true }
    });
    return jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      compensation: job.compensation,
      location: job.location,
      tags: job.tags,
      company: job.company?.name ?? null
    }));
  }

  async applyToJob(userId: string, dto: ApplyJobDto) {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.prisma.jobApplication.upsert({
      where: { userId_jobId: { userId, jobId: dto.jobId } },
      update: { coverLetter: dto.coverLetter ?? null },
      create: {
        userId,
        jobId: dto.jobId,
        coverLetter: dto.coverLetter ?? null
      }
    });
  }

  async listApplications(userId: string) {
    const applications = await this.prisma.jobApplication.findMany({
      where: { userId },
      include: { job: true },
      orderBy: { createdAt: 'desc' }
    });
    return applications.map((app) => ({
      id: app.id,
      jobTitle: app.job.title,
      status: app.status,
      submittedAt: app.createdAt
    }));
  }
}
