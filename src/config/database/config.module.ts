import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { DbConfigService } from './config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.string().default('localhost'),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_USER: Joi.string().default('postgres'),
                DATABASE_PASSWORD: Joi.string().allow(null, '').default('postgres'),
                DATABASE_NAME: Joi.string().default('test'),
            })
        }),
    ],
    providers: [ConfigService, DbConfigService],
    exports: [ConfigService, DbConfigService]
})
export class DbConfigModule { }
