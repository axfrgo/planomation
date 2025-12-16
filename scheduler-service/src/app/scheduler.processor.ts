import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { SocialIntegrationsService } from '@social-scheduler/social-integrations';

@Processor('post-queue')
export class SchedulerProcessor extends WorkerHost {
    private readonly logger = new Logger(SchedulerProcessor.name);

    constructor(private readonly socialIntegrationsService: SocialIntegrationsService) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} for post ${job.data.postId}`);

        switch (job.name) {
            case 'publish-post':
                return this.handlePublishPost(job.data);
            default:
                throw new Error(`Unknown job name: ${job.name}`);
        }
    }

    private async handlePublishPost(data: any) {
        this.logger.log(`Publishing post ${data.postId} to ${data.platform}`);

        return await this.socialIntegrationsService.publish(
            data.platform,
            {
                postId: data.postId,
                content: data.content
            }
        );
    }
}
