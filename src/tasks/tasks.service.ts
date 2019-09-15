import { Injectable, Get, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {TaskRepository} from './repositories/task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import {TaskStatus} from './task-status.enum';

@Injectable()
export class TasksService {

  constructor( @InjectRepository(TaskRepository) private taskRespository: TaskRepository){}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const taskFound = await this.taskRespository.findOne({ id });
    if(!taskFound){
      throw new NotFoundException(`Task With "${id}" not found`);
    }
    return taskFound;
  }

  async deleteTask(id: number): Promise<void> {
    const taskFound = await this.getTaskById(id);
    if (!taskFound) {
      throw new NotFoundException(`Task With "${id}" not found`);
    }
    this.taskRespository.remove(taskFound);
  }


  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }
}
