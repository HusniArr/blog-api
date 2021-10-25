import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}
     async findOne(id:string){
        const user =  await this.userModel.findOne({_id:id}).exec();
        return user;
    }
    async findByUsername(username:string){
        const user = await this.userModel.findOne({username:username}).exec();
        return user; 
    }

    async create(username:string,password:string,email:string){
        const user = new this.userModel({username:username,password:password,email:email});
         return await user.save();
        
    }
    async delete(id:string){
       const user =  await this.userModel.deleteOne({_id:id});
       return user;
    }
    async find(){
        const user = await this.userModel.find().exec();
        return user;
    }
    async update(id:string,username:string,password:string,email:string){
        const user = await  this.userModel.findOne({_id:id});
        user.username = username;
        user.password = password;
        user.email = email;
        const res =  user.save();
        return res;
    }

}
