import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(@InjectQueue('post-queue') private postQueue: Queue) { }

    async schedulePost(postId: string, scheduledAt: Date, content: string, platform: string) {
        const delay = scheduledAt.getTime() - Date.now();
        if (delay < 0) {
            throw new Error('Scheduled time must be in the future');
        }

        this.logger.log(`Scheduling post ${postId} for ${scheduledAt.toISOString()} on ${platform}`);

        // Add job to BullMQ with delay
        await this.postQueue.add(
            'publish-post',
            {
                postId,
                content,
                platform,
            },
            {
                delay,
                jobId: postId, // Ensure idempotency
                removeOnComplete: true,
            },
        );

        return { success: true, postId, status: 'SCHEDULED' };
    }
}
