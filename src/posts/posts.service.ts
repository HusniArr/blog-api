import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts, PostDocument } from 'src/schemas/posts.schema';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Posts.name) private postModel : Model<PostDocument>){}

    async create(createPost:PostDto){
        const post = new this.postModel(createPost);
        return post.save();
    }
     async findAll(){
         const post = this.postModel.find().exec();
         return post;
     }

     async findOne(id:string){
         const post = this.postModel.findOne({_id:id});
         return post;
     }
     async update(id:string,postDto:PostDto){
        const post = await this.postModel.findByIdAndUpdate(id,postDto).setOptions({new:true});
      if (!post) {
        throw new NotFoundException();
      }
      return post;
     }
     async delete(id:string){
         return this.postModel.deleteMany({_id:id});
     }
}
