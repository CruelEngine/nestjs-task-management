import { Injectable, Get, Param, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {TaskRepository} from './repositories/task.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import {TaskStatus} from './task-status.enum';
import {User} from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {

  constructor( @InjectRepository(TaskRepository) private taskRespository: TaskRepository){}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTasks(filterDto : GetTasksFilterDto,user : User): Promise<Task[]> {
   return await this.taskRespository.getTasks(filterDto,user);
  }

  async createTask(createTaskDto: CreateTaskDto,user :User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto,user);
  }

  async getTaskById(id: number,user : User): Promise<Task> {
    const taskFound = await this.taskRespository.findOne({ where : {id, userId: user.id} });
    if(!taskFound){
      throw new NotFoundException(`Task With "${id}" not found`);
    }
    return taskFound;
  }

  async deleteTask(id: number,user : User): Promise<void> {
    const taskFound = await this.getTaskById(id,user);
    if (!taskFound) {
      throw new NotFoundException(`Task With "${id}" not found`);
    }
    this.taskRespository.remove(taskFound);
  }

  async updateTaskStatus(id: number, status: TaskStatus,user:User): Promise<Task> {
    const task = await this.getTaskById(id,user);
    task.status  = status;
    await task.save();
    return task;
  }

}
