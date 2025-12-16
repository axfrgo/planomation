import { Test, TestingModule } from '@nestjs/testing';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

// Mock the module
jest.mock('@clerk/backend', () => ({
    verifyToken: jest.fn(),
}));

describe('ClerkAuthGuard', () => {
    let guard: ClerkAuthGuard;
    let mockVerifyToken: jest.Mock;

    beforeEach(async () => {
        // Reset mocks
        mockVerifyToken = verifyToken as jest.Mock;
        mockVerifyToken.mockReset();

        const module: TestingModule = await Test.createTestingModule({
            providers: [ClerkAuthGuard],
        }).compile();

        guard = module.get<ClerkAuthGuard>(ClerkAuthGuard);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('should return true for valid token', async () => {
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: { authorization: 'Bearer valid-token' },
                }),
            }),
        } as unknown as ExecutionContext;

        mockVerifyToken.mockResolvedValue({ sub: 'user_123' });

        expect(await guard.canActivate(context)).toBe(true);
    });

    it('should return false for missing token', async () => {
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {},
                }),
            }),
        } as unknown as ExecutionContext;

        expect(await guard.canActivate(context)).toBe(false);
    });

    it('should return false for invalid token', async () => {
        const context = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: { authorization: 'Bearer invalid-token' },
                }),
            }),
        } as unknown as ExecutionContext;

        mockVerifyToken.mockRejectedValue(new Error('Invalid token'));

        expect(await guard.canActivate(context)).toBe(false);
    });
});
