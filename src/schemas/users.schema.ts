import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enum/role.enum";
export type   UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    _id:string;

    @Prop()
    username:string;

    @Prop()
    password:string;

    @Prop()
    email:string

    @Prop([String])
    roles:Role[];

    @Prop({default:false})
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);