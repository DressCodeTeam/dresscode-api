import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type GetUserInfosResponse = {
  get_user_infos: {
    success: boolean;
    content: {
      gender: string;
      pseudo: string;
      email: string;
      birth_date: string;
    };
  };
}[];
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string): Promise<UserProfileDto> {
    try {
      const queryResult = (await this.userRepository.query(
        `SELECT get_user_Infos($1)`,
        [userId],
      )) as GetUserInfosResponse;

      const userInfos = queryResult[0]?.get_user_infos;

      if (!userInfos?.success) {
        throw new InternalServerErrorException(
          userInfos?.content || 'Failed to fetch user profile',
        );
      }

      return userInfos.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching user profile: ${error}`,
      );
    }
  }
}
