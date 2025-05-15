import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';

@Controller('users')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // TODO: Implement a service to get user's profile and add Api Documentation decorators
  @Get('profile')
  @ApiOperation({ summary: "Return user's profile" })
  getProfile(@Request() req: AuthenticatedRequest) {
    Logger.log('User profile accessed', req.user);
    return this.usersService.getProfile(req.user.userId);
  }
}
