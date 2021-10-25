import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards, Get} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import  * as bcrypt  from 'bcrypt';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class AuthController {
    constructor(private authService : AuthService,private userService : UsersService){}

    @Post('auth/register')
    async register(@Body('username') username : string, @Body('password') password : string, @Body('email') email : string,@Res() res: Response){
       const salt = bcrypt.genSaltSync(0);
       const hash = bcrypt.hashSync(password,salt);
        const userExists = await this.userService.findByUsername(username);
        if(userExists){
            res.status(HttpStatus.CONFLICT).send({message:"username sudah terdaftar."})
        }else{
            await this.userService.create(username,hash,email);
            res.status(HttpStatus.OK).send({message:"Berhasil disimpan"})
        }
       
    }
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)    
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
