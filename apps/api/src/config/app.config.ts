import { registerAs } from '@nestjs/config';

type AppConfig = {
  port: number;
  rateLimit: {
    ttl: number;
    max: number;
  };
  siwe: {
    domain: string;
    origin: string;
    statement: string;
  };
};

export default registerAs<AppConfig>('app', () => ({
  port: parseInt(process.env.API_PORT ?? '4000', 10),
  rateLimit: {
    ttl: parseInt(process.env.API_RATE_LIMIT_TTL ?? '60', 10),
    max: parseInt(process.env.API_RATE_LIMIT_MAX ?? '60', 10)
  },
  siwe: {
    domain: process.env.SIWE_DOMAIN ?? 'localhost',
    origin: process.env.SIWE_ORIGIN ?? 'http://localhost:3000',
    statement: process.env.SIWE_STATEMENT ?? 'Sign in to Crypto Serv'
  }
}));
