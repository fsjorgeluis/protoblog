import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


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
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}

