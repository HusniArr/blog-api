import { Controller, Delete, Get, HttpException, HttpStatus, Param ,Res} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}
    @Delete('/:id')
    delete(@Param('id') id:string,@Res() res:Response){
        this.userService.delete(id);
        res.status(HttpStatus.OK).send({message:"berhasil dihapus."});
    }
    @Get('')
    findAll(){
        const user = this.userService.find();
        return user;
    }
    @Get('/:id')
    findOne(@Param('id') id:string){
        const user = this.userService.findOne(id);
        return user;
        
    }
}
