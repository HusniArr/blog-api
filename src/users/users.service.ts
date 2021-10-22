import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}
     findOne(id:string){
        const user =  this.userModel.findOne({_id:id}).exec();
        return user;
    }
    async existUser(username:string){
        const user = await this.userModel.find({username:username}).exec();
        return user;
    }
    async create(username:string,password:string,email:string){
        const user = new this.userModel({username:username,password:password,email:email});
        return user.save();
        
    }
    async delete(id:string){
       const user =  await this.userModel.deleteOne({_id:id});
       return user;
    }
    async find(){
        const user = await this.userModel.find().exec();
        return user;
    }
}
