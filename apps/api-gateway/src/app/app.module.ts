import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGatewayController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './posts.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, AuthGatewayController, PostsController],
  providers: [AppService],
})
export class AppModule { }
