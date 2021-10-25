import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService : JwtService){}
    async validateUser(username:string,pass:string){
        const user = await this.usersService.findByUsername(username);
      if(bcrypt.compareSync(pass,user.password)){
        const {password,...result} = user;
        return result;
      }
    return null;
    }
    async login(user:any){
        const payload = {username : user.username, sub : user.id};
        return {
            access_token : this.jwtService.sign(payload),
        }
    }
}
