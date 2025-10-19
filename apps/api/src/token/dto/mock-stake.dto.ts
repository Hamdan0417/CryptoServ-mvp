import { IsEthereumAddress, IsNumber } from 'class-validator';

export class MockStakeDto {
  @IsEthereumAddress()
  address!: string;

  @IsNumber()
  amount!: number;
}
