import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

const TIER_THRESHOLDS = [
  { name: 'FOUNDATION', min: 0 },
  { name: 'GROWTH', min: 1000 },
  { name: 'GOVERNANCE', min: 5000 }
] as const;

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  private resolveTier(amount: number) {
    let current = TIER_THRESHOLDS[0].name;
    for (const tier of TIER_THRESHOLDS) {
      if (amount >= tier.min) {
        current = tier.name;
      }
    }
    return current;
  }

  async getStakeSummary(address: string) {
    const normalized = address.toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { walletAddress: normalized } });
    if (!user) {
      return { address: normalized, totalStaked: '0', tier: TIER_THRESHOLDS[0].name };
    }
    const sum = await this.prisma.stake.aggregate({
      where: { userId: user.id },
      _sum: { amount: true }
    });
    const total = sum._sum.amount?.toNumber() ?? 0;
    return {
      address: normalized,
      totalStaked: total.toString(),
      tier: this.resolveTier(total)
    };
  }

  async mockStake(address: string, amount: number) {
    const allowMock = this.configService.get<string>('ALLOW_MOCK_WALLET');
    if (allowMock !== 'true') {
      throw new BadRequestException('Mock staking disabled');
    }
    if (amount <= 0) {
      throw new BadRequestException('amount must be positive');
    }
    const user = await this.usersService.ensureUser(address);
    await this.prisma.stake.create({
      data: {
        userId: user.id,
        poolId: 'mock',
        amount: new Prisma.Decimal(amount),
        tier: this.resolveTier(amount)
      }
    });
    return this.getStakeSummary(address);
  }
}
