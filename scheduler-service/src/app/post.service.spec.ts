import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getQueueToken } from '@nestjs/bullmq';

describe('PostService', () => {
    let service: PostService;
    let mockQueue: any;

    beforeEach(async () => {
        mockQueue = {
            add: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostService,
                {
                    provide: getQueueToken('post-queue'),
                    useValue: mockQueue,
                },
            ],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should schedule a post', async () => {
        const futureDate = new Date(Date.now() + 10000);
        const result = await service.schedulePost('123', futureDate, 'Hello World', 'TWITTER');

        expect(result.success).toBe(true);
        expect(mockQueue.add).toHaveBeenCalledWith(
            'publish-post',
            expect.objectContaining({ postId: '123' }),
            expect.objectContaining({ delay: expect.any(Number) })
        );
    });

    it('should throw error if date is in past', async () => {
        const pastDate = new Date(Date.now() - 10000);
        await expect(service.schedulePost('123', pastDate, 'Hello', 'TWITTER'))
            .rejects.toThrow('Scheduled time must be in the future');
    });
});
