// Database configuration

// export default () => ({
  //   uri: process.env.DATABASE_URL || '',
  // });
  
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT, 10) || 6543,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // synchronize: process.env.NODE_ENV !== 'production',
  // logging: process.env.NODE_ENV !== 'production',
}));