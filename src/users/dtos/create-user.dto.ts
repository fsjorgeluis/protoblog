import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    password: string;

    @IsString()
    bio?: string;

    @IsString()
    avatar?: string;

}

export class EditUserDTO extends PartialType(
    OmitType(CreateUserDTO, ['username'] as const)
) { }