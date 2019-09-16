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

  async getTasks(filterDto : GetTasksFilterDto): Promise<Task[]> {
   return await this.taskRespository.getTasks(filterDto);
  }

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

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status  = status;
    await task.save();
    return task;
  }

}
