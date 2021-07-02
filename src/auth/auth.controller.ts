import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos';
import { LocalAuthGuard } from './guards';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() credentials: RegisterDTO) {
        return this.authService.register(credentials);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: LoginDTO) {
        return this.authService.login(req)
    }
}
