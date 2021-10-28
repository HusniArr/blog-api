import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { MongooseConfigService } from './config/mongooseConfigService';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { CaslModule } from './casl/casl.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports:[ConfigModule.forRoot({envFilePath:'.development.env'})],
      useClass: MongooseConfigService
  }),
  PostsModule,
  AuthModule,
  UsersModule,
  CaslModule
],
    controllers:[AppController],
    providers:[AppService,{provide:APP_GUARD,useClass:RolesGuard}]
    // providers:[AppService]
})
export class AppModule {}
