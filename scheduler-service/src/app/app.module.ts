import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerProcessor } from './scheduler.processor';
import { PostService } from './post.service';
import { SocialIntegrationsService } from '@social-scheduler/social-integrations';
import { PostController } from './post.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from '@social-scheduler/db';

@Module({
  imports: [
    DbModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'post-queue',
    }),
  ],
  controllers: [PostController, AuthController],
  providers: [PostService, SchedulerProcessor, SocialIntegrationsService, AuthService],
})
export class AppModule { }
