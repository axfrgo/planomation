import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PostsController', () => {
    let controller: PostsController;
    let mockHttpService: any;

    beforeEach(async () => {
        mockHttpService = {
            post: jest.fn().mockReturnValue(of({ data: { success: true } })),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [
                { provide: HttpService, useValue: mockHttpService },
            ],
        }).compile();

        controller = module.get<PostsController>(PostsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should proxy request to scheduler service', async () => {
        const body = { postId: '1' };
        const result = await controller.createPost(body);

        expect(mockHttpService.post).toHaveBeenCalledWith(
            expect.stringContaining('http://localhost:3333/api/schedule'),
            body
        );
        expect(result).toEqual({ success: true });
    });
});
