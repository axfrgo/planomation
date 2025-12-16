import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
    let controller: PostController;
    let mockService: any;

    beforeEach(async () => {
        mockService = {
            schedulePost: jest.fn().mockResolvedValue({ success: true, status: 'SCHEDULED' }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [
                { provide: PostService, useValue: mockService },
            ],
        }).compile();

        controller = module.get<PostController>(PostController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call schedulePost on service', async () => {
        const body = {
            postId: 'test-1',
            scheduledAt: new Date().toISOString(),
            content: 'Hello',
            platform: 'TWITTER',
        };

        const result = await controller.schedulePost(body);

        expect(mockService.schedulePost).toHaveBeenCalledWith(
            body.postId,
            expect.any(Date),
            body.content,
            body.platform
        );
        expect(result).toEqual({ success: true, status: 'SCHEDULED' });
    });
});
