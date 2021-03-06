import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepo } from './auth.repository';
import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth-guard/auth.guard';
import { ConfigService } from '@nestjs/config';
import { StudentModule } from '../student/student.module';
import { TaskModule } from '../task/task.module';
import * as config from 'config';

const myConfig: { secretkey: string; expiresIn: number } = config.get('jwt');

//! process.env.JWT_SECRET is from elasticbeanstalk when we add there, env variables
//! token should be provided in as
//! { "authorization": "Bearer TOKEN"}

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || myConfig.secretkey,
      signOptions: {
        expiresIn: myConfig.expiresIn, // 1h
      },
    }),
    TypeOrmModule.forFeature([AuthRepo]),
    forwardRef(() => StudentModule),
    forwardRef(() => TaskModule),
  ],
  providers: [ConfigService, AuthService, AuthGuard, AuthResolver], // Look at the providers, we provided JwtStrategy
  exports: [AuthGuard, ConfigService, AuthService, PassportModule], // in Exports , we exported jwtStrategy and passport module, so other modules may use them
})
export class AuthModule {}
