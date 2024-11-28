// Environment variables

import { config } from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';
config({ path: `.env.${ENV}` });

export default () => ({
  isDevelopment: ENV === 'development',
});
