import { Injectable, Get, Param, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {} from 'uuid/v1';
import uuid = require('uuid');
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const taskFound = this.tasks.find(task => task.id === id);
    if(!taskFound){
      throw new NotFoundException(`Task With "${id}" not found`);
    }
    return taskFound;
  }

  deleteTask(id: string): void {
    const taskFound = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== taskFound.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}
