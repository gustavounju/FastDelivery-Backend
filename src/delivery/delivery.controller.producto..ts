import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductoService } from './delivery.service.producto';
import { Task } from '../domain/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() taskData: Partial<Task>): Promise<Task | null> {
    return this.tasksService.update(+id, taskData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
