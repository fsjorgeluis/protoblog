import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../users.service';

@Controller('profiles')
export class ProfileController {
    constructor(private usersService: UsersService) { }

    @Get(':username')
    async findProfile(@Param('username') username: string) {
        const profile = await this.usersService.findByUsername(username);
        return { profile };
    }

    @Post(':username/follow')
    async followUser(@Param('username') username: string) {
        return this.usersService.followUser(username);
    }

    @Delete(':username/follow')
    async unfollowUser(@Param('username') username: string) {
        return this.usersService.unfollowUser(username);
    }
}
