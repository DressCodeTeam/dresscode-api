import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in the environment variables.');
  }
  return {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  };
});
