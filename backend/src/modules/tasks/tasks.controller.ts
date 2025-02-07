import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    try {
      const task = await this.tasksService.create(createTaskDto, req.user.id);
      return task;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Request() req) {
    await this.tasksService.remove(id, req.user.id);
  }
}