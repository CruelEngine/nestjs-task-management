import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const passwordHash = await hash(password, this.salt);
    return passwordHash === this.password;
  }
}
