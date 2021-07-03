import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController, ProfileController]
})
export class UsersModule { }
