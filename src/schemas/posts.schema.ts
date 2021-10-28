import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
export type PostDocument = Posts & Document;

@Schema()
export class Posts{
    @Prop()
    title:string;
    @Prop()
    content:string;
    @Prop([{type:SchemaTypes.ObjectId,ref:'users'}])
    userId:string;
    @Prop()
    isPublished:Boolean;
}

export const PostSchema = SchemaFactory.createForClass(Posts);