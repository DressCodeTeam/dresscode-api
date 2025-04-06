import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // Protect this route
  getProfile(@Request() req) {
    Logger.log('User profile accessed', req.user);
    return { message: `This is a protected route` };
  }
}
