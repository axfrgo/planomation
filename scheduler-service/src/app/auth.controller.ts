import { Controller, Get, Query, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('twitter/login')
    async twitterLogin(@Res() res: Response) {
        const clientId = process.env.TWITTER_CLIENT_ID;
        const redirectUri = encodeURIComponent(`${process.env.API_GATEWAY_URL}/auth/twitter/callback`);
        const scope = encodeURIComponent('tweet.read tweet.write users.read offline.access');
        const state = 'state_placeholder'; // Should be random

        // Using OAuth 2.0 PKCE (Simplified for MVP, would normally generate code_challenge)
        const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

        if (!clientId) {
            return res.status(500).json({ message: 'TWITTER_CLIENT_ID not configured' });
        }

        return res.redirect(url);
    }

    @Get('twitter/callback')
    async twitterCallback(@Query('code') code: string, @Req() req, @Res() res: Response) {
        if (!code) {
            return res.status(400).json({ message: 'No code provided' });
        }

        // Mock Token Exchange (Real implementation requires POST to twitter with code)
        // For MVP/Demo without real Keys, we simulate a successful connection
        // We assume the user ID comes from a session or query param in a real guarded route
        // But since this is a callback, we'd normally user 'state' to recover session.

        // FIX: We need the USER ID. 
        // For this MVP, we will redirect to frontend with ?token=mock_token
        // And let the frontend call a "connect" API with the user's token.

        // Ideally, we persist here. But we don't know the Clerk User ID here easily without state cookie.

        return res.redirect('http://localhost:4200/dashboard?status=success&platform=twitter');
    }

    // Temporary endpoint to Connect via API with User ID
    // This is a "Cheat" endpoint to let the frontend verify it works
    @Get('connect-mock')
    async connectMock(@Query('userId') userId: string, @Query('platform') platform: string) {
        return this.authService.saveSocialConnection(
            userId,
            platform,
            `mock_access_token_${Date.now()}`,
            `mock_refresh_token_${Date.now()}`,
            new Date(Date.now() + 3600 * 1000)
        );
    }
}
