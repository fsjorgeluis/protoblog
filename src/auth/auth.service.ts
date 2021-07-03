import {
    Injectable,
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

    async login(user: any): Promise<object> {
        const { username, id, role, email, bio, avatar } = user.user;
        const payload = { username: username, sub: id, role: role };
        return {
            user: {
                id,
                username,
                email,
                role,
                bio,
                avatar,
                access_token: this.jwtService.sign(payload)
            }
        }
    }
}
