import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { MongooseConfigService } from './config/mongooseConfigService';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports:[ConfigModule.forRoot({envFilePath:'.development.env'})],
      useClass: MongooseConfigService
  }),
  PostsModule,
  AuthModule,
  UsersModule
],
    controllers:[AppController],
    providers:[AppService]
})
export class AppModule {}
