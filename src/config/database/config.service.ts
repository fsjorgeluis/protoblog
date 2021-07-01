import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';


@Injectable()
export class DbConfigService {
    constructor(private readonly configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('db.host');
    }

    get port(): number {
        return this.configService.get<number>('db.port');
    }

    get username(): string {
        return this.configService.get<string>('db.username');
    }

    get password(): string {
        return this.configService.get<string>('db.password');
    }

    get database(): string {
        return this.configService.get<string>('db.database');
    }

}
