import { Repository, EntityRepository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import {
  ConflictException, Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.salt = await genSalt();
    user.username = username;
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({
      where: {
        username,
      },
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
