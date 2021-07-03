import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { EditUserDTO } from './dtos';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCurrentUser(@Request() { user: { username } }) {
        return this.usersService.findByUsername(username);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(
        @Request() { user: { username } },
        @Body() dto: EditUserDTO
    ) {
        return this.usersService.updateOne(username, dto);
    }
}
