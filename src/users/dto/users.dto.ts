import { IsNotEmpty, IsString } from "class-validator";

export class UsersDto {
    @IsString()
    @IsNotEmpty()
    username:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    email:string
}