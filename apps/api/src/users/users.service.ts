import { Injectable, NotFoundException } from '@nestjs/common';
import { Persona, User, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureUser(walletAddress: string): Promise<User> {
    const normalized = walletAddress.toLowerCase();
    return this.prisma.user.upsert({
      where: { walletAddress: normalized },
      update: {},
      create: { walletAddress: normalized }
    });
  }

  async getById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updatePersona(userId: string, persona: Persona) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { persona }
    });
  }

  async assignRoles(userId: string, roles: UserRole[]) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { roles }
    });
  }
}
