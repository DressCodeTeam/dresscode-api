import * as crypto from 'crypto';

export class SecretGenerator {
  static generateSecret(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }
}