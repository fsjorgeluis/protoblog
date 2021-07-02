import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, RegisterDTO } from './dtos';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne(email);
        if (user && await user.comparePassword(password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async register(credentials: RegisterDTO) {
        return this.userService.createOne(credentials);
    }

    async login(user: any) {
        const { username, id, role } = user.user;
        const payload = { username: username, sub: id, role: role };
        return {
            access_token: this.jwtService.sign(payload)
        }
        // try {
        //     const user = await this.userService.findOne(email);
        //     if (user && await user.comparePassword(password)) return user;
        //     else throw new UnauthorizedException('Credenciales inválidas.');
        // } catch (error) {
        //     if (error.status === 401) {
        //         throw new UnauthorizedException('Credenciales inválidas.');
        //     }
        //     if (error.status === 403) {
        //         throw new ForbiddenException('El email no se encuentra registrado!');
        //     }
        //     throw new InternalServerErrorException();
        // }
    }
}
