import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './repositories/user-repository';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userReposiroty: UserRepository){

    }

    signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void>{
        return this.userReposiroty.signUp(authCredentialsDto);
    }
}
