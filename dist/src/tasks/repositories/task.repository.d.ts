import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { CreateTaskDto } from "../dto/create-task-dto";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";
import { User } from "src/auth/entities/user.entity";
export declare class TaskRepository extends Repository<Task> {
    private logger;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
}
