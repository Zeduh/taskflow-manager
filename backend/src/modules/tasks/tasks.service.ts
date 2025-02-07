import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const newTask = {
      ...createTaskDto,
      userId
    };
    
    const task = this.tasksRepository.create(newTask);
    const savedTask = await this.tasksRepository.save(task);
    
    return savedTask;
  }

  async findAll(userId: string): Promise<Task[]> {
    return await this.tasksRepository.findByUserId(userId);
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { 
        id,
        userId
      }
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
    await this.findOne(id, userId); // Verifica se a task existe e pertence ao usuário
    await this.tasksRepository.update({ id, userId }, updateTaskDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.tasksRepository.remove(task);
  }
}