import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getProfile(userId: string) {
    return { message: `User profile ${userId}` };
  }
}
