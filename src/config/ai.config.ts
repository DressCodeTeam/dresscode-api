import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => {
  if (!process.env.AI_API_URL) {
    throw new Error('AI_API_URL is not defined in the configuration');
  }
  return {
    baseUrl: process.env.AI_API_URL,
  };
});
