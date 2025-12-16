import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    private readonly logger = new Logger(ClerkAuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            this.logger.warn('No token provided');
            return false;
        }

        try {
            const permissions = await verifyToken(token, {
                secretKey: process.env['CLERK_SECRET_KEY']
            });

            request.user = permissions;
            return true;
        } catch (error) {
            this.logger.error('Token verification failed', error);
            return false;
        }
    }
}
