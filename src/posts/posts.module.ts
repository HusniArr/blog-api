import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from 'src/schemas/posts.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports:[MongooseModule.forFeature([{name:Posts.name,schema:PostSchema}])],
    providers:[PostsService],
    controllers:[PostsController]
})
export class PostsModule {}
