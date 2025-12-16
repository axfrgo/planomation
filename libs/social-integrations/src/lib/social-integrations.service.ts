import { Injectable, Logger } from '@nestjs/common';
import { PlatformAdapter, PostContent, PublishResult, SocialPlatform } from './types';
import { MockAdapter } from './adapters/mock.adapter';
import { TwitterAdapter } from './adapters/twitter.adapter';
import { LinkedInAdapter } from './adapters/linkedin.adapter';

@Injectable()
export class SocialIntegrationsService {
    private readonly logger = new Logger(SocialIntegrationsService.name);
    private adapters: Map<SocialPlatform, PlatformAdapter> = new Map();

    constructor() {
        // Register adapters
        // In a real app, this might be configuration driven
        this.registerAdapter(new MockAdapter(SocialPlatform.FACEBOOK)); // Keep mock for FB for now
        this.registerAdapter(new TwitterAdapter());
        this.registerAdapter(new LinkedInAdapter());
    }

    registerAdapter(adapter: PlatformAdapter) {
        this.logger.log(`Registering adapter for ${adapter.name}`);
        this.adapters.set(adapter.name, adapter);
    }

    async publish(platform: string, content: PostContent): Promise<PublishResult> {
        // Convert string to enum safely
        const platformEnum = platform as SocialPlatform;
        const adapter = this.adapters.get(platformEnum);

        if (!adapter) {
            this.logger.error(`No adapter found for platform: ${platform}`);
            return {
                success: false,
                error: `No adapter found for platform: ${platform}`
            };
        }

        try {
            this.logger.log(`Publishing to ${platform}...`);
            return await adapter.publish(content);
        } catch (error: any) {
            this.logger.error(`Failed to publish to ${platform}`, error.stack);
            return {
                success: false,
                error: error.message || 'Unknown error during publishing'
            };
        }
    }
}
