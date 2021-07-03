import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UsersService } from '../users.service';

@Controller('profiles')
export class ProfileController {
    constructor(private usersService: UsersService) { }

    @Get(':username')
    async findProfile(@Param('username') username: string) {
        const profile = await this.usersService.findByUsername(username);
        return { profile };
    }

    @UseGuards(JwtAuthGuard)
    @Post(':username/follow')
    async followUser(
        @Request() { user },
        @Param('username') username: string
    ) {
        const profile = await this.usersService.followUser(user, username);
        return { profile };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':username/follow')
    async unfollowUser(
        @Request() { user },
        @Param('username') username: string
    ) {
        const profile = await this.usersService.unfollowUser(user, username);
        return { profile };
    }
}
