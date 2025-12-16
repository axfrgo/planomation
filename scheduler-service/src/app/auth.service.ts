import { Injectable } from '@nestjs/common';
import { PrismaService } from '@social-scheduler/db';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async saveSocialConnection(userId: string, platform: string, accessToken: string, refreshToken?: string, expiresAt?: Date) {
        return this.prisma.socialConnection.create({
            data: {
                userId,
                platform,
                accessToken,
                refreshToken,
                expiresAt,
            },
        });
    }

    async getSocialConnections(userId: string) {
        return this.prisma.socialConnection.findMany({
            where: { userId },
        });
    }
}
