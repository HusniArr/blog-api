import { Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import  * as bcrypt  from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService,private userService : UsersService){}

    @Post('/register')
    async register(@Body('username') username : string, @Body('password') password : string, @Body('email') email : string,@Res() res: Response){
       const salt = bcrypt.genSaltSync(0);
       const hash = bcrypt.hashSync(password,salt);
        const userExists = await this.userService.findOne(username);
        if(userExists){
            res.status(HttpStatus.CONFLICT).send({message:"username sudah terdaftar."})
        }else{
            const result = this.userService.create(username,hash,email);
            res.status(HttpStatus.OK).send({message:"Berhasil disimpan",result})
        }
       
    }
}
