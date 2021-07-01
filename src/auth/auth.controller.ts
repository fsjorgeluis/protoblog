import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() credentials: RegisterDTO) {
        return this.authService.register(credentials);
    }

    @Post('login')
    login(@Body() credentials: LoginDTO) {
        return this.authService.login(credentials);
    }
}
