import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService { }

@Injectable()
export class AppSocketService {
    constructor() { }

    getHello(): string {
        return 'Hello World!';
    }
}