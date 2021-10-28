import {  Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../role.decorator';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';
import { Role } from '../enum/role.enum';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from 'src/enum/action.enum';
import { Posts } from 'src/schemas/posts.schema';
import { User } from 'src/schemas/users.schema';

@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService,private caslAbilityFactory : CaslAbilityFactory){}

    @Post()
    // @Roles(Role.Admin)
    @UsePipes(new ValidationPipe({transform:true}))
    create(@Body() createPost:PostDto){
        const user = new User();
        user.isAdmin = true;
        const ability = this.caslAbilityFactory.createForUser(user)
        if(ability.can(Action.Create,Posts)){
            const post = this.postService.create(createPost);
            return post;

        }
    }

    @Get()
    findAll(){
        return this.postService.findAll();
    }
    @Get('/:id')
    findOne(@Param('id') id){
        const post = this.postService.findOne(id);
        return post;
    }
    @Put('/:id')
    update(@Param('id') id, @Body() updatePost:PostDto){
        const post = this.postService.update(id,updatePost);
        return post;
    }
    @Delete('/:id')
    delete(@Param('id') id){
         this.postService.delete(id);
        return {
            message:'Data berhasil dihapus.'
        }
    }


}
