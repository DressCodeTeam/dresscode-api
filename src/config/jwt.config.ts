import { registerAs } from '@nestjs/config';
import * as crypto from 'crypto';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'),
  expiresIn: process.env.JWT_EXPIRATION || '24h',
}));