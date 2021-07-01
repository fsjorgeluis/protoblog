import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dtos/auth.dto';

@Injectable()
export class AuthService {

    private mockUser = {
        "user": {
            "email": "jake@jake.jake",
            "token": "jwt.token.here",
            "username": "jake",
            "bio": "I work at statefarm",
            "image": null
        }
    }

    register(credentials: RegisterDTO) {
        return this.mockUser;
    }

    login(credentials: LoginDTO) {
        if (credentials.email === this.mockUser.user.email)
            return credentials;
        throw new NotFoundException('No existe');

    }
}
