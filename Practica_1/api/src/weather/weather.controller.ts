import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async testRedis() {
    return this.weatherService.getAlldata();
  }

  @Post()
  async saveData(@Body() data: any) {
    return this.weatherService.uploadData(data);
  }

  @Delete()
  async deleteData() {
    return this.weatherService.deleteData();
  }
}
