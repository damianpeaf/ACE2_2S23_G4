export const envConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 3000,
  redisHost: process.env.REDIS_HOST || '',
  redisPort: +process.env.REDIS_PORT || 6379,
  redisPassword: process.env.REDIS_PASSWORD || '',
});
