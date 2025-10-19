export default () => ({
  environment: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://serv:serv@localhost:5432/crypto_serv',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  s3Endpoint: process.env.S3_ENDPOINT ?? 'http://localhost:9000'
});
