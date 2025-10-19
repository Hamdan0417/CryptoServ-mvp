import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { MockStakeDto } from './dto/mock-stake.dto';
import { SessionGuard } from '../auth/guards/session.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('stakes/:address')
  getStake(@Param('address') address: string) {
    return this.tokenService.getStakeSummary(address);
  }

  @UseGuards(SessionGuard)
  @Post('stakes/mock')
  createMockStake(@Body() dto: MockStakeDto) {
    return this.tokenService.mockStake(dto.address, dto.amount);
  }
}
