import { Test, TestingModule } from '@nestjs/testing';
import { SocialIntegrationsService } from './social-integrations.service';
import { MockAdapter } from './adapters/mock.adapter';
import { SocialPlatform } from './types';
import { vi } from 'vitest';

describe('SocialIntegrationsService', () => {
  let service: SocialIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialIntegrationsService],
    }).compile();

    service = module.get<SocialIntegrationsService>(SocialIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register mock adapters by default', async () => {
    const result = await service.publish(SocialPlatform.TWITTER, {
      postId: 'test-1',
      content: 'Hello World'
    });

    expect(result.success).toBe(true);
    expect(result.platformId).toContain('mock-TWITTER');
  });

  it('should fail for unknown platform', async () => {
    const result = await service.publish('UNKNOWN_PLATFORM', {
      postId: 'test-1',
      content: 'Hello World'
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('No adapter found');
  });

  it('should register a new adapter', async () => {
    const customAdapter = new MockAdapter(SocialPlatform.FACEBOOK);
    vi.spyOn(customAdapter, 'publish');

    service.registerAdapter(customAdapter);

    await service.publish(SocialPlatform.FACEBOOK, {
      postId: 'test-2',
      content: 'Hello Facebook'
    });

    expect(customAdapter.publish).toHaveBeenCalled();
  });
});
