import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClerkAuthGuard } from '@social-scheduler/util-auth';

@Controller('posts')
@UseGuards(ClerkAuthGuard)
export class PostsController {
    private readonly logger = new Logger(PostsController.name);
    // In production, this URL should be an environment variable
    private readonly SCHEDULER_SERVICE_URL = 'http://localhost:3333/api';

    constructor(private readonly httpService: HttpService) { }

    @Post()
    async createPost(@Body() body: any) {
        this.logger.log('Proxying create post request to Scheduler Service');
        try {
            const response = await firstValueFrom(
                this.httpService.post(`${this.SCHEDULER_SERVICE_URL}/schedule`, body)
            );
            return response.data;
        } catch (error: any) {
            this.logger.error(`Failed to proxy request: ${error.message}`);
            throw error;
        }
    }
}
