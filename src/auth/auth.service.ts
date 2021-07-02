import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, RegisterDTO } from './dtos';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
    ) { }

    async register(credentials: RegisterDTO) {
        return this.userService.createOne(credentials);
    }

    async login({ email, password }: LoginDTO) {
        try {
            const user = await this.userService.findOne(email);
            if (user && await user.comparePassword(password)) return user;
            else throw new UnauthorizedException('Credenciales inválidas.');
        } catch (error) {
            if (error.status === 401) {
                throw new UnauthorizedException('Credenciales inválidas.');
            }
            if (error.status === 403) {
                throw new ForbiddenException('El email no se encuentra registrado!');
            }
            throw new InternalServerErrorException();
        }
    }
}
