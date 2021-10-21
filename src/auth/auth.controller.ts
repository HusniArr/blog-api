import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import  * as bcrypt  from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService,private userService : UsersService){}

    @Post('/register')
    async register(@Body('username') username : string, @Body('password') password : string, @Body('email') email : string){
       const user = await this.authService.checkUser(username);
        if(!user){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password,salt);
            const res = this.userService.create(username,hash,email);
            return res;
            

        }
    }
}
