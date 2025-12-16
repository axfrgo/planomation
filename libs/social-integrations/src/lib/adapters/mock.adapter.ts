import { Logger } from '@nestjs/common';
import { PlatformAdapter, PostContent, PublishResult, SocialPlatform } from '../types';

export class MockAdapter implements PlatformAdapter {
    name = SocialPlatform.TWITTER; // Defaulting to Twitter for now, or could be dynamic
    private readonly logger = new Logger(MockAdapter.name);

    constructor(platformName?: SocialPlatform) {
        if (platformName) {
            this.name = platformName;
        }
    }

    async publish(content: PostContent): Promise<PublishResult> {
        this.logger.log(`[MOCK] Publishing to ${this.name}: ${content.content}`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            platformId: `mock-${this.name}-${Date.now()}`,
            rawResponse: { mocked: true }
        };
    }
}
