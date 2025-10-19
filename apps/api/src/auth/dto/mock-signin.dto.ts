import { IsEthereumAddress } from 'class-validator';

export class MockSignInDto {
  @IsEthereumAddress()
  address!: string;
}
