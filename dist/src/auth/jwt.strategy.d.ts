import { JwtPayload } from './dto/jwt-payload.interface';
import { UserRepository } from './repositories/user-repository';
import { User } from './entities/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRespository;
    constructor(userRespository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
