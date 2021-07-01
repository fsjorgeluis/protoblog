import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbConfigModule } from './config/database/config.module';
import { DbConfigService } from './config/database/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useFactory: (dbConfigService: DbConfigService) => ({
        name: 'default',
        type: 'postgres',
        host: dbConfigService.host,
        port: dbConfigService.port,
        username: dbConfigService.username,
        password: dbConfigService.password,
        database: dbConfigService.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: false,
        logging: true,
        autoLoadEntities: true,
      }),
      inject: [DbConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
