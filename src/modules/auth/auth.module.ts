import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './interfaces/controllers/auth.controller';
import { JwtStrategy } from './interfaces/strategies/jwt.strategy';
import {
  LoginUseCase,
  RegisterStudentUseCase,
  CreateStaffUserUseCase,
} from './application/use-cases';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { AUTH_REPOSITORY } from './domain/repositories/auth-repository.token';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AuthController],
  providers: [
    // Casos de uso
    LoginUseCase,
    RegisterStudentUseCase,
    CreateStaffUserUseCase,

    // Repositorios
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthRepository,

    // Estrategias
    JwtStrategy,
  ],
  imports: [
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: envs.jwtSecret,
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
