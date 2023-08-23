import { Injectable } from '@nestjs/common';

@Injectable()
export class AppSocketService {
    constructor() { }

    getHello(): string {
        return 'Hello World!';
    }

    getInitialData(): any {
        return {
            live_data: {
                air_quality: [12],
                labels: ["12:00"],
                light: [12],
                temperature: [23.0],
                presence: false,
            },
            global_state: {
                is_light_on: false,
                vent_state: 'off',
            },
            notifications: [],
        }
    }
}