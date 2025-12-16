import { Injectable } from '@nestjs/common';
import { User, RegisterDto } from '@social-scheduler/api-interfaces';
import { PrismaService } from '@social-scheduler/db';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<(User & { passwordHash: string }) | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) return null;

        // Map Prisma Role to Interface Role (assuming they match, but just to be safe)
        return {
            ...user,
            role: user.role as 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER'
        };
    }

    async create(createDto: RegisterDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createDto.password, salt);

        // Transaction: Create Tenant first, then User
        const result = await this.prisma.$transaction(async (prisma) => {
            const tenant = await prisma.tenant.create({
                data: {
                    name: createDto.companyName,
                    planTier: 'FREE'
                }
            });

            const user = await prisma.user.create({
                data: {
                    email: createDto.email,
                    passwordHash,
                    firstName: createDto.firstName,
                    lastName: createDto.lastName,
                    role: 'OWNER',
                    tenantId: tenant.id
                }
            });
            return user;
        });

        return {
            ...result,
            role: result.role as 'OWNER' | 'ADMIN' | 'EDITOR' | 'VIEWER'
        };
    }
}
