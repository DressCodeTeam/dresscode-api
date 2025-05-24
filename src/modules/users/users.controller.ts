import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: "Return user's profile" })
  @ApiOkResponse({
    description: 'User profile returned successfully',
    type: UserProfileDto,
  })
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserProfileDto> {
    return this.usersService.getProfile(req.user.userId);
  }
}
