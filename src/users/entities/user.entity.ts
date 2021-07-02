import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import { AbstractEntity } from './abstract.entity';


@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: null, nullable: true })
    avatar: string | null;

    // TODO: add following


    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    toJSON() {
        return classToPlain(this);
    }
}