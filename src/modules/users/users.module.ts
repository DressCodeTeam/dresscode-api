import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import User entity to work with
  controllers: [UsersController], // Add UsersController for user-related routes
})
export class UsersModule {}
