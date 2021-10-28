import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService : JwtService){}
    async validateUser(username:string,pass:string):Promise<any>{
        const user = await this.usersService.findByUsername(username);
      if(bcrypt.compareSync(pass,user.password)){
        return user;
      }
    return null;
    }
    async login(user:User){
        const payload = {username : user.username, sub : user._id};
        return {
            access_token : this.jwtService.sign(payload),
        }
    }
}
