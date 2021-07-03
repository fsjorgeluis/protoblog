import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, EditUserDTO } from './dtos';
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
            if (!user) throw new NotFoundException('El email no se encuentra registrado!');
            return user;
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException('El email no se encuentra registrado!');
            }
            throw new InternalServerErrorException();
        }
    }

    async findByUsername(username: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ username });
            if (!user) throw new NotFoundException();
            return user;
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException('El usuario no se encuentra registrado!');
            }
            throw new InternalServerErrorException();
        }
    }

    async updateOne(username: string, dto: EditUserDTO): Promise<UserEntity & EditUserDTO> {
        try {
            const exists = await this.userRepository.findOne({ where: { username: username } });
            if (!exists) throw new NotFoundException();
            const edited = Object.assign(exists, dto);
            return await this.userRepository.save(edited);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async followUser(username: string) { }

    async unfollowUser(username: string) { }

    async deleteOne() { }
}
