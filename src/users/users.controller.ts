import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param ,Post,Res,Put, Request, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';



@Controller()
export class UsersController {
    constructor(private userService : UsersService){}
    
    @Delete('users/:id')
    delete(@Param('id') id:string,@Res() res:Response){
        this.userService.delete(id);
        res.status(HttpStatus.OK).send({message:"berhasil dihapus."});
    }
    @Get('users')
    findAll(){
        const user = this.userService.find();
        return user;
    }
    @Get('users/:id')
    findOne(@Param('id') id:string){
        const user = this.userService.findOne(id);
        return user;
        
    }
    @Put('users/:id')
    async update(@Param('id') id:string,@Body('username') username:string, @Body('password') password:string , @Body('newpassword') newpassword:string, @Body('email') email:string){
        const salt = bcrypt.genSaltSync(0);
       const hash = bcrypt.hashSync(newpassword,salt);
        const user = await this.userService.findOne(id);
        if(bcrypt.compareSync(password,user.password)){
            const result = this.userService.update(id,username,hash,email);
            return result;     
        }
    
    }
    @Post('users')
    async create(@Body('username') username : string, @Body('password') password : string, @Body('email') email : string,@Res() res: Response){
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
     @Post('users/create')
     async createUser(@Body('username') username : string, @Body('password') password : string, @Body('email') email : string,@Res() res: Response){
        const iv = randomBytes(16);
    
        const key = randomBytes(32);
        const cipher = createCipheriv('aes-256-ctr', key, iv);
    
        let encryptedData = cipher.update(password, "utf-8", "hex");

        encryptedData += cipher.final("hex");

        // console.log("encrypted message :"+encryptedData);
        const userExists = await this.userService.findByUsername(username);
         if(userExists){
             res.status(HttpStatus.CONFLICT).send({message:"username sudah terdaftar."})
         }else{
             await this.userService.create(username,encryptedData,email);
             res.status(HttpStatus.OK).send({message:"Berhasil disimpan"})
         }
     }

  
}
