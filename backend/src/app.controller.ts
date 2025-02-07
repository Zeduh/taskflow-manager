import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      name: 'Task Manager API',
      version: '1.0.0',
      status: 'online',
      timestamp: new Date().toISOString(),
    };
  }
}