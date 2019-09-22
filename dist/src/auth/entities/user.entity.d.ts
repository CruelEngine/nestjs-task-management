import { BaseEntity } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    tasks: Task[];
    validatePassword(password: string): Promise<boolean>;
}
