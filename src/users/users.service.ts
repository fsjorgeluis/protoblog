import {
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async createOne(dto: CreateUserDTO): Promise<UserEntity> {
        try {
            const user = this.userRepository.create(dto);
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('El email o el nombre de usuario ya se encuentran en uso!');
            }
            throw new InternalServerErrorException();
        }
    }

    async findAll(): Promise<UserEntity[]> {
        return
    }

    async findOne(email: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ email });
            if (!user) throw new ForbiddenException('El email no se encuentra registrado!');
            return user;
        } catch (error) {
            console.log(error)
            if (error.status === 403) {
                throw new ForbiddenException('El email no se encuentra registrado!');
            }
            throw new InternalServerErrorException();
        }
    }

    async updateOne() { }

    async deleteOne() { }
}
