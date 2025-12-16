import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerProcessor } from './scheduler.processor';
import { SocialIntegrationsService } from '@social-scheduler/social-integrations';
import { Job } from 'bullmq';

describe('SchedulerProcessor', () => {
    let processor: SchedulerProcessor;
    let mockSocialService: any;

    beforeEach(async () => {
        mockSocialService = {
            publish: jest.fn().mockResolvedValue({ success: true, platformId: 'mock-id' }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SchedulerProcessor,
                {
                    provide: SocialIntegrationsService,
                    useValue: mockSocialService,
                },
            ],
        }).compile();

        processor = module.get<SchedulerProcessor>(SchedulerProcessor);
    });

    it('should be defined', () => {
        expect(processor).toBeDefined();
    });

    it('should process publish-post job', async () => {
        const job: Partial<Job> = {
            name: 'publish-post',
            id: '123',
            data: {
                postId: 'post-1',
                platform: 'TWITTER',
                content: 'Hello World',
            },
        };

        const result = await processor.process(job as Job);

        expect(mockSocialService.publish).toHaveBeenCalledWith('TWITTER', {
            postId: 'post-1',
            content: 'Hello World',
        });
        expect(result.success).toBe(true);
    });
});
