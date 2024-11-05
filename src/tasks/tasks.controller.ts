import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() data: { title: string; description?: string }) {
    return this.tasksService.createTask(data);
  }

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(+id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() data: Partial<Task>) {
    return this.tasksService.updateTask(+id, data);
  }

  @Patch(':id')
  markTaskAsCompleted(@Param('id') id: string) {
    return this.tasksService.updateTask(+id, { completed: true });
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id);
  }
}
