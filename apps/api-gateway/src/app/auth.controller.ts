import { Controller, Get, Query, Res, Req, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from 'express';

@Controller('auth') // Note: global prefix 'api' usually applies, so this becomes /api/auth
export class AuthGatewayController {
    // Assuming scheduler-service is on 3333 as previously configured
    private readonly SCHEDULER_SERVICE_URL = process.env.SCHEDULER_SERVICE_URL || 'http://localhost:3333';

    constructor(private readonly httpService: HttpService) { }

    @Get('twitter/login')
    async twitterLogin(@Res() res: Response) {
        try {
            // We request the login URL from the scheduler service
            // We disable redirects so we can capture the 302 location
            const response = await firstValueFrom(
                this.httpService.get(`${this.SCHEDULER_SERVICE_URL}/auth/twitter/login`, {
                    maxRedirects: 0,
                    validateStatus: (status) => status >= 200 && status < 400
                })
            );

            if (response.status === 302) {
                return res.redirect(response.headers.location);
            }
            // If it returns JSON or something else
            return res.status(response.status).send(response.data);

        } catch (error) {
            // If we can't reach scheduler or it errors
            console.error('Twitter Login Error:', error.message);
            // Fallback: Just redirect client directly if proxy fails (only valid in dev)
            return res.redirect(`${this.SCHEDULER_SERVICE_URL}/auth/twitter/login`);
        }
    }

    @Get('twitter/callback')
    async twitterCallback(@Query() query, @Res() res: Response) {
        try {
            // Pass the callback params to scheduler
            const response = await firstValueFrom(
                this.httpService.get(`${this.SCHEDULER_SERVICE_URL}/auth/twitter/callback`, {
                    params: query,
                    maxRedirects: 0,
                    validateStatus: (status) => status >= 200 && status < 400
                })
            );
            if (response.status === 302) {
                return res.redirect(response.headers.location);
            }
            return res.status(response.status).send(response.data);
        } catch (error) {
            console.error('Twitter Callback Error:', error.message);
            // Fallback for dev
            const queryString = new URLSearchParams(query).toString();
            return res.redirect(`${this.SCHEDULER_SERVICE_URL}/auth/twitter/callback?${queryString}`);
        }
    }

    @Get('connect-mock')
    async connectMock(@Query() query, @Res() res: Response) {
        try {
            const response = await firstValueFrom(
                this.httpService.get(`${this.SCHEDULER_SERVICE_URL}/auth/connect-mock`, {
                    params: query,
                })
            );
            return res.json(response.data);
        } catch (error) {
            throw new HttpException(error.response?.data || 'Scheduler Service Error', error.response?.status || 500);
        }
    }
}
