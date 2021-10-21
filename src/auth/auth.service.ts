import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}
    async checkUser(username:string){
        const user = await this.usersService.findOne(username);
        return user;
    }
}
