import {  Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostDocument } from 'src/schemas/posts.schema';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService){}

    @Post()
    @UsePipes(new ValidationPipe({transform:true}))
    create(@Body() createPost:PostDto){
        const post = this.postService.create(createPost);
        return post;
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
