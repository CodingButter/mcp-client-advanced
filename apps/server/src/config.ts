import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  maxConcurrentTasks: parseInt(process.env.MAX_CONCURRENT_TASKS || '16', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }
};