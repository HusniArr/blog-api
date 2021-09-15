import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type PostDocument = Posts & Document;

@Schema()
export class Posts{
    @Prop()
    title:string;
    @Prop()
    content:string;
    @Prop()
    userId:number;
}

export const PostSchema = SchemaFactory.createForClass(Posts);