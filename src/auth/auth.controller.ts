import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body(ValidationPipe) credentials: RegisterDTO) {
        return this.authService.register(credentials);
    }

    @Post('login')
    login(@Body(ValidationPipe) credentials: LoginDTO) {
        return this.authService.login(credentials);
    }
}
