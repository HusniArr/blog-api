import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{
    constructor(private configService:ConfigService){}

    createMongooseOptions():MongooseModuleOptions{
        const mongo_uri = this.configService.get('MONGODB_URI');
        return {
            uri: mongo_uri
        }
    }
}