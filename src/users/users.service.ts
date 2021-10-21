import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}
    async findOne(username:string){
        const user = await this.userModel.findOne({username:username});
        return user;
    }
    async create(username:string,password:string,email:string){
        const user = new this.userModel({username:username,password:password,email:email});
        return user.save();
        
    }
}
