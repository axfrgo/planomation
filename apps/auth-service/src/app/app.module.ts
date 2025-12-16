import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { DbModule } from '@social-scheduler/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev_secret_key_do_not_use_in_prod',
      signOptions: { expiresIn: '60m' },
    }),
    DbModule,
  ],
  controllers: [AuthController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule { }
