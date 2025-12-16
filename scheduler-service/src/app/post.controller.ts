import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('schedule')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post()
    async schedulePost(@Body() body: { postId: string; scheduledAt: string; content: string; platform: string }) {
        return this.postService.schedulePost(
            body.postId,
            new Date(body.scheduledAt),
            body.content,
            body.platform
        );
    }
}
