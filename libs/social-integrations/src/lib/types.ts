export enum SocialPlatform {
    TWITTER = 'TWITTER',
    LINKEDIN = 'LINKEDIN',
    FACEBOOK = 'FACEBOOK'
}

export interface PostContent {
    postId: string;
    content: string;
    mediaUrls?: string[];
}

export interface PublishResult {
    success: boolean;
    platformId?: string; // ID of the post on the platform
    error?: string;
    rawResponse?: any;
}

export interface PlatformAdapter {
    name: SocialPlatform;
    publish(content: PostContent): Promise<PublishResult>;
}
